function getFoodData(element) {
    return {
        id: $(element).data("id"),
        name: $(element).data("name"),
        carbs: $(element).data("carbs"),
        protein: $(element).data("protein"),
        fat: $(element).data("fat"),
        calories: $(element).data("calories"),
        size: $(element).data("servingsize"),
        unit: $(element).data("servingunit")
    };
}

function addFoodRecord(addButton) {
    const selectedCard = $(addButton).closest(".card");
    const foodData = getFoodData(selectedCard);

    const rowClone = $("#NewRowTemplate").clone();
    rowClone.removeAttr("id").removeClass("d-none");

    rowClone.find(".recordID").val(foodData.id);
    rowClone.find(".recordName").val(foodData.name);
    rowClone.find(".recordCarbs").val(foodData.carbs);
    rowClone.find(".recordProtein").val(foodData.protein);
    rowClone.find(".recordFat").val(foodData.fat);
    rowClone.find(".recordCalories").val(foodData.calories);

    $("#RecordBody").append(rowClone);
    updateInputNames();
}

function setNewFoodFields(editButton) {
    const selectedCard = $(editButton).closest(".card");
    const foodData = getFoodData(selectedCard);

    $("#existingFoodID").val(foodData.id);
    $("#newFoodName").val(foodData.name);
    $("#newFoodSize").val(foodData.size);
    $("#newFoodUnit").val(foodData.unit);
    $("#newFoodCarbs").val(foodData.carbs);
    $("#newFoodProtein").val(foodData.protein);
    $("#newFoodFat").val(foodData.fat);
    $("#newFoodCalories").val(foodData.calories);

    newFoodIDChanged();
}

function newFoodIDChanged() {
    const isNewFood = $("#existingFoodID").val() == 0;
    $("#NewFoodHeader").text(isNewFood ? "Add New Food" : "Edit Food");
    $("#NewFoodCancel").toggleClass("d-none", isNewFood);
}

function cancelEdit() {
    $("#existingFoodID").val(0);
    newFoodIDChanged();
}

function updateInputNames() {
    $("#RecordBody").find("tr").each((index, row) => {
        $(row).find(".recordID").attr("name", `FoodIDs[${index}]`);
        $(row).find(".recordQuantity").attr("name", `Quantities[${index}]`);
    });
}

function removeRow(row) {
    $(row).closest("tr").remove();
    updateInputNames();
}

function updateCalories() {
    const carbs = parseFloat($("#newFoodCarbs").val()) || 0;
    const protein = parseFloat($("#newFoodProtein").val()) || 0;
    const fat = parseFloat($("#newFoodFat").val()) || 0;
    const calories = (carbs * 4) + (protein * 4) + (fat * 9);
    $("#newFoodCalories").val(calories);
}

