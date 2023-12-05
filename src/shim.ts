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
      { url: "https://dl.osu.bio/SH1mmer/ambassador.zip", codename: "ambassador" },
      { url: "https://dl.osu.bio/SH1mmer/brask.zip", codename: "brask" },
      { url: "https://dl.osu.bio/SH1mmer/brya.zip", codename: "brya" },
      { url: "https://dl.osu.bio/SH1mmer/clapper.zip", codename: "clapper" },
      { url: "https://dl.osu.bio/SH1mmer/coral.zip", codename: "coral" },
      { url: "https://dl.osu.bio/SH1mmer/corsola.zip", codename: "corsola" },
      { url: "https://dl.osu.bio/SH1mmer/dedede.zip", codename: "dedede" },
      { url: "https://dl.osu.bio/SH1mmer/enguarde.zip", codename: "enguarde" },
      { url: "https://dl.osu.bio/SH1mmer/glimmer.zip", codename: "glimmer" },
      { url: "https://dl.osu.bio/SH1mmer/grunt.zip", codename: "grunt" },
      { url: "https://dl.osu.bio/SH1mmer/hana.zip", codename: "hana" },
      { url: "https://dl.osu.bio/SH1mmer/hatch.zip", codename: "hatch" },
      { url: "https://dl.osu.bio/SH1mmer/jacuzzi.zip", codename: "jacuzzi" },
      { url: "https://dl.osu.bio/SH1mmer/kukui.zip", codename: "kukui" },
      { url: "https://dl.osu.bio/SH1mmer/lulu.zip", codename: "lulu" },
      { url: "https://dl.osu.bio/SH1mmer/nami.zip", codename: "nami" },
      { url: "https://dl.osu.bio/SH1mmer/octopus.zip", codename: "octopus" },
      { url: "https://dl.osu.bio/SH1mmer/orco.zip", codename: "orco" },
      { url: "https://dl.osu.bio/SH1mmer/pyro.zip", codename: "pyro" },
      { url: "https://dl.osu.bio/SH1mmer/reks.zip", codename: "reks" },
      { url: "https://dl.osu.bio/SH1mmer/sentry.zip", codename: "sentry" },
      { url: "https://dl.osu.bio/SH1mmer/stout.zip", codename: "stout" },
      { url: "https://dl.osu.bio/SH1mmer/strongbad.zip", codename: "strongbad" },
      { url: "https://dl.osu.bio/SH1mmer/tidus.zip", codename: "tidus" },
      { url: "https://dl.osu.bio/SH1mmer/ultima.zip", codename: "ultima" },
      { url: "https://dl.osu.bio/SH1mmer/volteer.zip", codename: "volteer" },
      { url: "https://dl.osu.bio/SH1mmer/zork.zip", codename: "zork" },
    ],
  },
];
