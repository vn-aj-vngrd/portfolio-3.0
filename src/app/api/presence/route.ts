import { NextResponse } from "next/server";

const PRESENCE_KEY = "portfolio:presence:v1";
const ACTIVE_WINDOW_MS = 75_000;
const VISITOR_ID = /^[a-zA-Z0-9_-]{12,64}$/;

type PipelineResult = { result?: number; error?: string };

export async function POST(request: Request) {
  const redisUrl = process.env.KV_REST_API_URL;
  const redisToken = process.env.KV_REST_API_TOKEN;

  if (!redisUrl || !redisToken) {
    return NextResponse.json({ error: "Presence is unavailable" }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  const id = body?.id;

  if (!id || !VISITOR_ID.test(id)) {
    return NextResponse.json({ error: "Invalid visitor session" }, { status: 400 });
  }

  const now = Date.now();
  const response = await fetch(`${redisUrl}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["ZADD", PRESENCE_KEY, now, id],
      ["ZREMRANGEBYSCORE", PRESENCE_KEY, 0, now - ACTIVE_WINDOW_MS],
      ["ZCARD", PRESENCE_KEY],
      ["EXPIRE", PRESENCE_KEY, 120],
    ]),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Presence is unavailable" }, { status: 503 });
  }

  const results = (await response.json()) as PipelineResult[];
  const count = Math.max(1, Math.min(Number(results[2]?.result) || 1, 999));

  return NextResponse.json(
    { count },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
