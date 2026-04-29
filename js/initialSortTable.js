function initialSortTable() {
    const table = document.querySelector('table.sortable');
    if (table) {
        const firstHeader = table.tHead.rows[0].cells[0];
        if (firstHeader)
            sorttable.innerSortFunction.apply(firstHeader, []);
    }
}


function setupZoneFilter() {
    const table = document.querySelector('table.sortable');
    const zoneFilter = document.getElementById('zone-filter');

    if (!table || !zoneFilter)
        return;

    const rows = Array.from(table.tBodies[0].rows);
    const zones = [...new Set(rows.map(row => row.cells[1].textContent.trim()))].sort((a, b) => a.localeCompare(b));

    zones.forEach(zone => {
        const option = document.createElement('option');
        option.value = zone;
        option.textContent = zone;
        zoneFilter.appendChild(option);
    });

    zoneFilter.addEventListener('change', function() {
        const selectedZone = this.value;

        rows.forEach(row => {
            const routeZone = row.cells[1].textContent.trim();
            const shouldShowRow = selectedZone === '' || routeZone === selectedZone;
            row.style.display = shouldShowRow ? '' : 'none';
        });
    });
}

function initAllRoutesPage() {
    initialSortTable();
    setupZoneFilter();
}