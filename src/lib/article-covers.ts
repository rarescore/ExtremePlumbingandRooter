export function coverFor(slug: string, title: string): string {
  const t = `${slug} ${title}`.toLowerCase();
  if (t.includes("camera") || t.includes("inspection") || t.includes("buying"))
    return "/media/camera-inspection.jpg";
  if (t.includes("hydro") || t.includes("jet")) return "/media/hydro-jetting.jpg";
  if (
    t.includes("tankless") ||
    t.includes("water heater") ||
    t.includes("water-heater") ||
    t.includes("explode") ||
    t.includes("hot water")
  )
    return "/media/water-heaters.jpg";
  if (t.includes("tree") || t.includes("roots") || t.includes("sewer") || t.includes("trenchless") || t.includes("backup"))
    return "/media/trenchless-sewer.jpg";
  if (t.includes("copper") || t.includes("repipe") || t.includes("pex") || t.includes("earthquake") || t.includes("seismic"))
    return "/media/copper-repipe.jpg";
  if (t.includes("leak") || t.includes("ladwp") || t.includes("pressure") || t.includes("rust") || t.includes("faucet"))
    return "/media/leak-detection.jpg";
  if (t.includes("emergency") || t.includes("24-7") || t.includes("24/7") || t.includes("first-10"))
    return "/media/emergency-van.jpg";
  if (t.includes("boiler")) return "/media/boilers.jpg";
  if (t.includes("drain") || t.includes("clog") || t.includes("rooter") || t.includes("smell") || t.includes("unclog") || t.includes("snake"))
    return "/media/clogged-drain.jpg";
  if (t.includes("high-rise") || t.includes("high rise")) return "/media/high-rise.jpg";
  return "/media/hero-van.jpg";
}

export function formatArticleDate(value: string) {
  const iso = value.includes("T") ? value : value.replace(" ", "T");
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(new Date(`${iso}-07:00`));
}
