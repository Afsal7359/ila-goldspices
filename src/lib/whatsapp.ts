import { api, ApiOrder } from './api';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971XXXXXXXXX';

export function buildWhatsAppMessage(order: ApiOrder): string {
  const lines = [
    `🌿 *New Order — Ila Gold Spices*`,
    ``,
    `*Customer Details*`,
    `Name: ${order.customer_name}`,
    `Phone: ${order.customer_phone}`,
    order.customer_email   ? `Email: ${order.customer_email}` : '',
    order.customer_address ? `Address: ${order.customer_address}` : '',
    ``,
    `*Order Items*`,
    ...(order.items ?? []).map(
      (item) => `• ${item.product_name} (${item.pack_size}) × ${item.quantity} = ${(item.unit_price * item.quantity).toFixed(2)} ${order.currency ?? 'AED'}`
    ),
    ``,
    `*Total: ${order.total_amount?.toFixed(2)} ${order.currency ?? 'AED'}*`,
    order.notes ? `\nNotes: ${order.notes}` : '',
  ];
  return lines.filter((l) => l !== '').join('\n');
}

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export async function saveOrderAndGetWhatsAppLink(order: ApiOrder): Promise<string> {
  const total = (order.items ?? []).reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );
  const full: ApiOrder = { ...order, total_amount: total, whatsapp_sent: true };

  // Save to Google Sheets (fire and don't block UX on failure)
  api.saveOrder(full).catch(() => {});

  return getWhatsAppLink(buildWhatsAppMessage(full));
}
