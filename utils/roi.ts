export const ROI_CONSTANTS = {
  license: 100000,
  subscription: 15000,
  timeReduction: 0.7,
  subscriptionLimit: 500,
};

export type RoiInput = {
  employees: number;
  rate: number;
  time: number;
  drawingsPerEmployee: number;
};

export type RoiResult = {
  rawDrawings: number;
  cappedDrawings: number;
  hoursBefore: number;
  costBefore: number;
  costAfter: number;
  laborSavingsMonth: number;
  netSavingsMonth: number;
  paybackMonths: number | null;
  yearlyEffect: number;
  warning?: string;
};

export function calculateRoi({
  employees,
  rate,
  time,
  drawingsPerEmployee,
}: RoiInput): RoiResult {
  const rawDrawings = employees * drawingsPerEmployee;
  const cappedDrawings = Math.min(
    rawDrawings,
    ROI_CONSTANTS.subscriptionLimit,
  );

  const hoursBefore = cappedDrawings * (time / 60);
  const costBefore = hoursBefore * rate;
  const costAfter = costBefore * (1 - ROI_CONSTANTS.timeReduction);
  const laborSavingsMonth = costBefore - costAfter;
  const netSavingsMonth = laborSavingsMonth - ROI_CONSTANTS.subscription;

  const paybackMonths =
    netSavingsMonth > 0
      ? parseFloat(
          (ROI_CONSTANTS.license / netSavingsMonth).toFixed(1),
        )
      : null;

  const yearlyEffect = netSavingsMonth * 12 - ROI_CONSTANTS.license;

  const warning =
    rawDrawings > ROI_CONSTANTS.subscriptionLimit
      ? "Объём выше 500 чертежей/мес — условия рассчитываются индивидуально."
      : undefined;

  return {
    rawDrawings,
    cappedDrawings,
    hoursBefore,
    costBefore,
    costAfter,
    laborSavingsMonth,
    netSavingsMonth,
    paybackMonths,
    yearlyEffect,
    warning,
  };
}
