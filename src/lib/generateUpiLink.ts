export function generateUpiLink(
  upiId: string,
  upiName: string,
  amount: number,
  message?: string
): string {
  const params = new URLSearchParams({
    pa: upiId,
    pn: upiName,
    am: amount.toString(),
    cu: "INR",
  });

  if (message) {
    params.set("tn", message);
  }

  return `upi://pay?${params.toString()}`;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
