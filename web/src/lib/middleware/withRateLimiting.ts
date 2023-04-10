import { NextApiHandler } from "next";
import { redis } from "../redis";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import {
  decomposeValue,
  formatKey,
  formatValue,
  scanOutdatedRecords,
} from "../rate-limiting/scan-outdated";

export const DAILY_QUOTA = 100;

/**
 * Must be wrapped inside the `withAuth` middleware.
 * @param handler
 * @returns
 */
export const withRateLimiting = (handler: NextApiHandler): NextApiHandler => {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email!;
    const forwarded = req.headers["x-forwarded-for"];

    let ip: string = "";

    if (forwarded) {
      ip =
        (typeof forwarded === "string"
          ? forwarded.split(/, /)[0]
          : req.socket.remoteAddress) || "";
    }

    await scanOutdatedRecords();

    const finalKey = formatKey({ ip, email });
    const alternativeKey = formatKey({ email, ip: "" });

    let val = await redis.get(finalKey);
    if (!val) {
      val = await redis.get(alternativeKey);
    }

    const now = Date.now();

    // definitely a new user
    const newVal = formatValue({ date: now, usage: 1 });
    if (!val) {
      redis.set(finalKey, newVal);
      redis.set(alternativeKey, newVal);
    } else {
      const data = decomposeValue(val);
      if (data.usage >= DAILY_QUOTA) {
        res.status(403).send(`Daily quota of ${DAILY_QUOTA} reached.`);
        return;
      }
      const nv = formatValue({ date: now, usage: data.usage + 1 });
      await redis.set(finalKey, nv);
      await redis.set(alternativeKey, nv);
    }

    handler(req, res);
  };
};
