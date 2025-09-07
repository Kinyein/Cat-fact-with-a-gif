export async function getCatFact () {
  const res = await fetch("https://catfact.ninja/fact");
  const catFact = await res.json();
  return catFact.fact;
}