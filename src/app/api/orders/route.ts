import { NextRequest, NextResponse } from "next/server";
import { getOrders, saveOrder } from "@/lib/storage";
import { Order } from "@/types";

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const order: Order = {
    id: `ORD-${Date.now()}`,
    customer: {
      name: body.customer.name,
      phone: body.customer.phone,
      email: body.customer.email,
      address: body.customer.address,
    },
    items: body.items,
    total: body.total,
    createdAt: new Date().toISOString(),
  };

  await saveOrder(order);
  return NextResponse.json(order, { status: 201 });
}
