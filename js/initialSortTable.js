function initialSortTable() {
    const table = document.querySelector('table.sortable');
    if (table) {
        const firstHeader = table.tHead.rows[0].cells[0];
        if (firstHeader)
            sorttable.innerSortFunction.apply(firstHeader, []);
    }
}


function setupLocationFilter() {
    const table = document.querySelector('table.sortable');
    const locationFilter = document.getElementById('location-filter');

    if (!table || !locationFilter)
        return;

    const rows = Array.from(table.tBodies[0].rows);
    const locations = [...new Set(rows.map(row => row.cells[1].textContent.trim()))].sort((a, b) => a.localeCompare(b));

    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationFilter.appendChild(option);
    });

    locationFilter.addEventListener('change', function() {
        const selectedLocation = this.value;

        rows.forEach(row => {
            const routeLocation = row.cells[1].textContent.trim();
            const shouldShowRow = selectedLocation === '' || routeLocation === selectedLocation;
            row.style.display = shouldShowRow ? '' : 'none';
        });
    });
}

function initAllRoutesPage() {
    initialSortTable();
    setupLocationFilter();
}