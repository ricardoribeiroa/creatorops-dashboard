import rawCampaigns from "@/data/campaigns.json";
import {
  CAMPAIGN_STATUSES,
  PLATFORMS,
  type Campaign,
  type CampaignStatus,
  type Platform,
} from "@/types/campaign";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function fail(index: number, message: string): never {
  throw new Error(`Invalid campaign at index ${index}: ${message}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(
  record: Record<string, unknown>,
  key: string,
  index: number,
): string {
  const value = record[key];
  if (typeof value !== "string" || value.trim() === "") {
    fail(index, `"${key}" must be a non-empty string`);
  }
  return value;
}

function readNonNegativeInteger(
  record: Record<string, unknown>,
  key: string,
  index: number,
): number {
  const value = record[key];
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    fail(index, `"${key}" must be a non-negative integer`);
  }
  return value;
}

function readIsoDate(
  record: Record<string, unknown>,
  key: string,
  index: number,
): string {
  const value = readString(record, key, index);
  if (!ISO_DATE.test(value) || Number.isNaN(Date.parse(value))) {
    fail(index, `"${key}" must be an ISO date (YYYY-MM-DD)`);
  }
  return value;
}

function isOneOf<T extends string>(
  options: readonly T[],
  value: string,
): value is T {
  return (options as readonly string[]).includes(value);
}

/**
 * Validates unknown input (e.g. parsed JSON) and returns typed campaigns.
 * Throws a descriptive error on the first invalid record so bad data never
 * produces silently wrong KPIs.
 */
export function parseCampaigns(input: unknown): Campaign[] {
  if (!Array.isArray(input)) {
    throw new Error("Campaign data must be an array");
  }

  const seenIds = new Set<string>();

  return input.map((item, index): Campaign => {
    if (!isRecord(item)) fail(index, "expected an object");

    const id = readString(item, "id", index);
    if (seenIds.has(id)) fail(index, `duplicate id "${id}"`);
    seenIds.add(id);

    const status = readString(item, "status", index);
    if (!isOneOf<CampaignStatus>(CAMPAIGN_STATUSES, status)) {
      fail(index, `unknown status "${status}"`);
    }

    const platform = readString(item, "platform", index);
    if (!isOneOf<Platform>(PLATFORMS, platform)) {
      fail(index, `unknown platform "${platform}"`);
    }

    const startDate = readIsoDate(item, "startDate", index);
    const endDate = readIsoDate(item, "endDate", index);
    if (endDate < startDate) fail(index, '"endDate" is before "startDate"');

    return {
      id,
      title: readString(item, "title", index),
      description: readString(item, "description", index),
      status,
      creator: readString(item, "creator", index),
      platform,
      budget: readNonNegativeInteger(item, "budget", index),
      views: readNonNegativeInteger(item, "views", index),
      startDate,
      endDate,
    };
  });
}

/** Single data-access entry point. Swap the body for an API/DB call later. */
export function getCampaigns(): Campaign[] {
  return parseCampaigns(rawCampaigns);
}
