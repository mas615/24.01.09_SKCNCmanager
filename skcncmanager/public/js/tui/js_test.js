// const gridData = [
//     {
//       id: '10012',
//       city: 'Seoul',
//       country: 'South Korea'
//     },
//     {
//       id: '10013',
//       city: 'Tokyo',
//       country: 'Japan'    
//     },
//     {
//       id: '10014',
//       city: 'London',
//       country: 'England'
//     },
//     {
//       id: '10015',
//       city: 'Ljubljana',
//       country: 'Slovenia'
//     },
//     {
//       id: '10016',
//       city: 'Reykjavik',
//       country: 'Iceland'
//     }
//   ];
const grid = new tui.Grid({
    el: document.getElementById('grid'),
    data: gridData,
    scrollX: true,
    scrollY: true,
    columns: [
        { header: 'Seq', name: 'seq', width: 'auto' },
        { header: 'Project Code', name: 'project_code', width: 'auto', editor: 'text' },
        { header: 'Service Code', name: 'service_code', width: 'auto', editor: 'text' },
        { header: 'Manage Code', name: 'manage_code', width: 'auto', editor: 'text' },
        { header: 'Project Name', name: 'project_name', width: 'auto', editor: 'text', whiteSpace: 'pre-wrap'},
        { header: 'New Inspection Type', name: 'new_inspectiontype', width: 'auto', editor: 'text' },
        { header: 'Old Inspection Type', name: 'old_inspectiontype', width: 'auto', editor: 'text' },
        { header: 'Open Date', name: 'open_date', width: 'auto', editor: 'text' },
        { header: 'Relative Comp', name: 'relative_comp', width: 'auto', editor: 'text' },
        { header: 'Comp1', name: 'comp1', width: 'auto', editor: 'text' },
        { header: 'Part1', name: 'part1', width: 'auto', editor: 'text' },
        { header: 'Manager1', name: 'manager1', width: 'auto', editor: 'text' },
        { header: 'Manager1 Phone', name: 'manager1_phone', width: 'auto', editor: 'text' },
        { header: 'Comp2', name: 'comp2', width: 'auto', editor: 'text' },
        { header: 'Part2', name: 'part2', width: 'auto', editor: 'text' },
        { header: 'Manager2', name: 'manager2', width: 'auto', editor: 'text' },
        { header: 'Manager2 Phone', name: 'manager2_phone', width: 'auto', editor: 'text' },
        { header: 'Pentest', name: 'pentest', width: 'auto', editor: 'text' },
        { header: 'Source Code', name: 'source_code', width: 'auto', editor: 'text' },
        { header: 'Infra', name: 'infra', width: 'auto', editor: 'text' },
        { header: 'Note', name: 'note', width: 'auto', editor: 'text' },
        { header: 'Check1', name: 'check1', width: 'auto', editor: 'text' },
        { header: 'Check2', name: 'check2', width: 'auto', editor: 'text' },
        { header: 'Check3', name: 'check3', width: 'auto', editor: 'text' },
        { header: 'Check4', name: 'check4', width: 'auto', editor: 'text' },
        { header: 'Check5', name: 'check5', width: 'auto', editor: 'text' },
        { header: 'Check6', name: 'check6', width: 'auto', editor: 'text' },
        { header: 'Check7', name: 'check7', width: 'auto', editor: 'text' },
        { header: 'Old Manage Code', name: 'old_manage_code', width: 'auto', editor: 'text' },
        { header: 'Old Project', name: 'old_project', width: 'auto', editor: 'text' },
        { header: 'Del', name: 'del', width: 'auto', editor: 'text' }
      ]
    });
grid.on('afterChange', () => {
    const allData = grid.getData();  // 테이블의 모든 데이터 가져오기
    console.log(allData);  // 콘솔에 데이터 출력
})