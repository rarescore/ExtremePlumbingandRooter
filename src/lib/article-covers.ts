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
  if (
    t.includes("copper") ||
    t.includes("repipe") ||
    t.includes("pex") ||
    t.includes("earthquake") ||
    t.includes("seismic") ||
    t.includes("new-pipes") ||
    t.includes("new pipes")
  )
    return "/media/copper-repipe.jpg";
  if (t.includes("leak") || t.includes("ladwp") || t.includes("pressure") || t.includes("rust") || t.includes("faucet"))
    return "/media/leak-detection.jpg";
  if (t.includes("hard water") || t.includes("hard-water")) return "/media/articles/hard-water.jpg";
  if (t.includes("venting") || t.includes("vent stack")) return "/media/articles/vents.jpg";
  if (t.includes("backflow") || t.includes("potable") || t.includes("cross-connection"))
    return "/media/articles/backflow.jpg";
  if (t.includes("emergenc") || t.includes("24-7") || t.includes("24/7") || t.includes("first-10") || t.includes("vacation"))
    return "/media/articles/shutoff.jpg";
  if (t.includes("boiler")) return "/media/boilers.jpg";
  if (t.includes("drain") || t.includes("clog") || t.includes("rooter") || t.includes("smell") || t.includes("unclog") || t.includes("snake"))
    return "/media/clogged-drain.jpg";
  if (t.includes("high-rise") || t.includes("high rise")) return "/media/high-rise.jpg";
  return "/media/articles/open-wall.jpg";
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