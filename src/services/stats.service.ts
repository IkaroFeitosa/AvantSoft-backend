import { prisma } from "../prisma";

export async function salesPerDay() {
  const sales = await prisma.sale.findMany({
    select: { soldAt: true, value: true },
  });
  const map = new Map<string, number>();
  for (const s of sales) {
    const day = s.soldAt.toISOString().slice(0, 10); // YYYY-MM-DD
    map.set(day, (map.get(day) || 0) + s.value);
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, total]) => ({ date, total }));
}

export async function topClients() {
  const customers = await prisma.customer.findMany({
    include: { sales: true },
  });
  let topVolume: any = null;
  let topAvg: any = null;
  let topFreq: any = null;

  for (const c of customers) {
    const total = c.sales.reduce((acc, s) => acc + s.value, 0);
    const avg = c.sales.length ? total / c.sales.length : 0;
    const uniqueDays = new Set(
      c.sales.map((s) => s.soldAt.toISOString().slice(0, 10))
    ).size;

    if (!topVolume || total > topVolume.total)
      topVolume = { customer: c, total };
    if (!topAvg || avg > topAvg.avg) topAvg = { customer: c, avg };
    if (!topFreq || uniqueDays > topFreq.uniqueDays)
      topFreq = { customer: c, uniqueDays };
  }

  const simplify = (x: any, key: "total" | "avg" | "uniqueDays") =>
    x
      ? {
          id: x.customer.id,
          name: x.customer.name,
          email: x.customer.email,
          [key]: x[key],
        }
      : null;

  return {
    topVolume: simplify(topVolume, "total"),
    topAverage: simplify(topAvg, "avg"),
    topFrequency: simplify(topFreq, "uniqueDays"),
  };
}
