function deleteEquipment(id) {
    const data = {
        equipment_id: id
    };
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "DELETE", "/delete-equipment", false );
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send( JSON.stringify(data) );
    window.location.reload();
}