import { initDatabase, createDropdownOptions, renderTable } from "./db-utils.js";
const spinner = document.getElementById("spinner");
const filterGroup = document.getElementById("filter-container");
spinner.style.display = "block";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const db = await initDatabase();
    spinner.style.display = "none";
    filterGroup.style.display = "flex";
    const filters = [
      { id: "seriesFilter", column: "series" },
      { id: "gameFilter", column: "game" },
      { id: "platformFilter", column: "platform" },
      { id: "systemFilter", column: "system" },
      { id: "developerFilter", column: "developer" }
    ];

    filters.forEach(({ id, column }) => createDropdownOptions(db, id, column, 2));

    function renderAchievements() {
      const conditions = [];
      const sort = document.getElementById("achievementFilter").value;
      const orderBy = (sort === "asc" || sort === "desc")
        ? `ORDER BY achievement_num ${sort.toUpperCase()}`
        : "";

      filters.forEach(({ id, column }) => {
        const value = document.getElementById(id).value;
        if (value !== "All") {
          conditions.push(`${column} = '${value}'`);
        }
      });

      const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
      const query = `
        SELECT series AS Series, game AS Game, platform AS Platform, achievement_num AS Achievements,
          system AS System, developer AS Developer FROM achievements ${where} ${orderBy}`;
      const result = db.exec(query);
      renderTable(result, "achievement-output");
    }

    filters.map(f => f.id).concat(["achievementFilter"]).forEach(id => {
      document.getElementById(id).addEventListener("change", renderAchievements);
    });

    document.getElementById("resetAchievementFilters").addEventListener("click", () => {
      filters.forEach(({ id }) => {
        document.getElementById(id).value = "All";
      });
      document.getElementById("achievementFilter").value = "default";
      renderAchievements();
    });

    renderAchievements();
  } catch (err) {
    console.error("Error loading achievements:", err);
    document.getElementById("achievement-output").textContent = "Error loading data.";
  }
});
