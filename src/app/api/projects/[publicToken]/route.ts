import { NextResponse } from "next/server";
import { getProjectByPublicToken } from "@/lib/projects";
import { rateLimit } from "@/lib/rate-limit";

type RouteContext = {
  params: Promise<{
    publicToken: string;
  }>;
};

function getOriginFromHeaders(request: Request) {
  const forwardedHost = request.headers.get("x-digital-deadman-host");
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (forwardedHost) {
    return forwardedHost;
  }

  if (origin) {
    return origin;
  }

  if (!referer) {
    return "";
  }

  try {
    return new URL(referer).origin;
  } catch {
    return "";
  }
}

function extractHost(value: string) {
  if (!value) {
    return "";
  }

  try {
    return new URL(value).host.toLowerCase();
  } catch {
    return value.toLowerCase();
  }
}

export async function GET(request: Request, context: RouteContext) {
  const { publicToken } = await context.params;

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1";
  const { success } = await rateLimit(`api:${ip}`, 30, 60); // 30 requests per minute

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET, OPTIONS, HEAD",
          "access-control-allow-headers": "Content-Type, x-digital-deadman-host",
        },
      },
    );
  }

  const project = await getProjectByPublicToken(publicToken);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const requestHost = extractHost(getOriginFromHeaders(request));
  const allowed = project.allowedDomains;
  const domainAllowed =
    allowed.length === 0 || (requestHost ? allowed.includes(requestHost) : true);

  return NextResponse.json(
    {
      projectName: project.projectName,
      clientName: project.clientName,
      contactEmail: project.contactEmail,
      invoiceUrl: project.invoiceUrl,
      customMessage: project.customMessage,
      status: domainAllowed ? project.status : "paid",
      domainAllowed,
    },
    {
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, OPTIONS, HEAD",
        "access-control-allow-headers": "Content-Type, x-digital-deadman-host",
        "access-control-max-age": "86400",
      },
    },
  );
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, OPTIONS, HEAD",
      "access-control-allow-headers": "Content-Type, x-digital-deadman-host",
      "access-control-max-age": "86400",
    },
  });
}
