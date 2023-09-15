export type Shim = {
  url: string;
  codename: string;
};

export type ShimMirror = {
  name: string;
  shims: Shim[];
};

export const shimMirrors: ShimMirror[] = [
  {
    name: "DiffuseHyperion Mirror",
    shims: [
      { url: "https://dl.diffusehyperion.me/rma/brask.zip", codename: "brask" },
      { url: "https://dl.diffusehyperion.me/rma/brya.zip", codename: "brya" },
      {
        url: "https://dl.diffusehyperion.me/rma/clapper.zip",
        codename: "clapper",
      },
      { url: "https://dl.diffusehyperion.me/rma/coral.zip", codename: "coral" },
      {
        url: "https://dl.diffusehyperion.me/rma/corsola.zip",
        codename: "corsola",
      },
      {
        url: "https://dl.diffusehyperion.me/rma/dedede.zip",
        codename: "dedede",
      },
      {
        url: "https://dl.diffusehyperion.me/rma/enguarde.zip",
        codename: "enguarde",
      },
      {
        url: "https://dl.diffusehyperion.me/rma/glimmer.zip",
        codename: "glimmer",
      },
      { url: "https://dl.diffusehyperion.me/rma/grunt.zip", codename: "grunt" },
      { url: "https://dl.diffusehyperion.me/rma/hana.zip", codename: "hana" },
      { url: "https://dl.diffusehyperion.me/rma/hatch.zip", codename: "hatch" },
      {
        url: "https://dl.diffusehyperion.me/rma/jacuzzi.zip",
        codename: "jacuzzi",
      },
      { url: "https://dl.diffusehyperion.me/rma/kukui.zip", codename: "kukui" },
      { url: "https://dl.diffusehyperion.me/rma/nami.zip", codename: "nami" },
      {
        url: "https://dl.diffusehyperion.me/rma/octopus.zip",
        codename: "octopus",
      },
      { url: "https://dl.diffusehyperion.me/rma/orco.zip", codename: "orco" },
      { url: "https://dl.diffusehyperion.me/rma/pyro.zip", codename: "pyro" },
      { url: "https://dl.diffusehyperion.me/rma/reks.zip", codename: "reks" },
      {
        url: "https://dl.diffusehyperion.me/rma/sentry.zip",
        codename: "sentry",
      },
      { url: "https://dl.diffusehyperion.me/rma/stout.zip", codename: "stout" },
      {
        url: "https://dl.diffusehyperion.me/rma/strongbad.zip",
        codename: "strongbad",
      },
      { url: "https://dl.diffusehyperion.me/rma/tidus.zip", codename: "tidus" },
      {
        url: "https://dl.diffusehyperion.me/rma/ultima.zip",
        codename: "ultima",
      },
      {
        url: "https://dl.diffusehyperion.me/rma/volteer.zip",
        codename: "volteer",
      },
      { url: "https://dl.diffusehyperion.me/rma/zork.zip", codename: "zork" },
    ],
  },
  {
    name: "NotDarkn Mirror",
    shims: [
      { url: "https://dl.osu.bio/brask.zip", codename: "brask" },
      { url: "https://dl.osu.bio/brya.zip", codename: "brya" },
      { url: "https://dl.osu.bio/clapper.zip", codename: "clapper" },
      { url: "https://dl.osu.bio/coral.zip", codename: "coral" },
      { url: "https://dl.osu.bio/corsola.zip", codename: "corsola" },
      { url: "https://dl.osu.bio/dedede.zip", codename: "dedede" },
      { url: "https://dl.osu.bio/enguarde.zip", codename: "enguarde" },
      { url: "https://dl.osu.bio/glimmer.zip", codename: "glimmer" },
      { url: "https://dl.osu.bio/grunt.zip", codename: "grunt" },
      { url: "https://dl.osu.bio/hana.zip", codename: "hana" },
      { url: "https://dl.osu.bio/hatch.zip", codename: "hatch" },
      { url: "https://dl.osu.bio/jacuzzi.zip", codename: "jacuzzi" },
      { url: "https://dl.osu.bio/kukui.zip", codename: "kukui" },
      { url: "https://dl.osu.bio/lulu.zip", codename: "lulu" },
      { url: "https://dl.osu.bio/nami.zip", codename: "nami" },
      { url: "https://dl.osu.bio/octopus.zip", codename: "octopus" },
      { url: "https://dl.osu.bio/orco.zip", codename: "orco" },
      { url: "https://dl.osu.bio/pyro.zip", codename: "pyro" },
      { url: "https://dl.osu.bio/reks.zip", codename: "reks" },
      { url: "https://dl.osu.bio/sentry.zip", codename: "sentry" },
      { url: "https://dl.osu.bio/stout.zip", codename: "stout" },
      { url: "https://dl.osu.bio/strongbad.zip", codename: "strongbad" },
      { url: "https://dl.osu.bio/tidus.zip", codename: "tidus" },
      { url: "https://dl.osu.bio/ultima.zip", codename: "ultima" },
      { url: "https://dl.osu.bio/volteer.zip", codename: "volteer" },
      { url: "https://dl.osu.bio/zork.zip", codename: "zork" },
    ],
  },
];
