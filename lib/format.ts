export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatMileage(mileage: number) {
  return new Intl.NumberFormat("en-US").format(mileage);
}
