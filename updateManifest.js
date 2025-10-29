import fs from "fs";

const distDir = "./dist/assets";
const manifestPath = "./dist/manifest.json";
const files = fs.readdirSync(distDir);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
files.forEach((p) => {
  if (p.startsWith("background-")) {
    manifest.background.service_worker = `assets/${p}`;
  }
});

if (Array.isArray(manifest.web_accessible_resources)) {
  manifest.web_accessible_resources.forEach((script) => {
    script.resources = script.resources.map((jsFile) => {
      const baseName = jsFile.replace("assets/", "").replace(".js", "");
      const matchedFile = files.find((file) => file.startsWith(`${baseName}-`));
      return matchedFile ? `assets/${matchedFile}` : jsFile;
    });
  });
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
