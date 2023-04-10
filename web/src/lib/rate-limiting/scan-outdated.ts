import { redis } from "../redis";

const LAST_SCAN_KEY = "_last-scan_";

export interface RateLimitValue {
  date: number; // ms
  usage: number; // number of conversions per day
}
export interface RateLimitKey {
  ip: string; // this can be an empty as well
  email: string; // this can be an empty string as well
}

export const formatKey = ({ ip, email }: RateLimitKey) => {
  return `${ip}/${email}`;
};

export const decomposeKey = (key: string) => {
  const d = key.split("/");
  return {
    ip: d[0],
    email: d[1],
  };
};

export const formatValue = ({ date, usage }: RateLimitValue) => {
  return `${date},${usage}`;
};

export const decomposeValue = (value: string) => {
  const [date, usage] = value.split(",").map((each) => parseInt(each));
  return { date, usage } as RateLimitValue;
};

export const scanOutdatedRecords = async () => {
  const val = await redis.get(LAST_SCAN_KEY);
  const todayBeginning = new Date();
  todayBeginning.setUTCHours(0, 0, 0, 0);

  if (!val || val <= String(todayBeginning)) {
    const keys = await redis.keys("*");

    keys.forEach(async (key) => {
      const val = (await redis.get(key))!;
      const { date } = decomposeValue(val);
      if (date <= todayBeginning.valueOf()) {
        redis.del(key);
      }
    });

    redis.set(LAST_SCAN_KEY, Date.now());
  }
};
