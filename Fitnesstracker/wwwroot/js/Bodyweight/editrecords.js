function getDateString(DateObject) {
    const year = String(DateObject.getFullYear());
    let month = String(DateObject.getMonth() + 1);
    month = month.length === 1 ? "0".concat(month) : month;
    let day = String(DateObject.getDate());
    day = day.length === 1 ? "0".concat(day) : day;

    return `${year}-${month}-${day}`;
}

function updateInputNames() {
    $("table tbody tr").each((index, element) => {
        $(element).find("input[type=number]").attr("name", `Weights[${index}]`);
        $(element).find("input[type=date]").attr("name", `Dates[${index}]`);
    });
}

function removeTemplateRow() {
    $("#NewRowTemplate").remove();
}

function removeRow(sender) {
    $(sender).closest("tr").remove();
}

function addNewRow(weight, date) {
    const rowClone = $("#NewRowTemplate").clone();
    rowClone.removeAttr("id").removeClass("d-none");
    rowClone.find("input").eq(0).val(weight);
    rowClone.find("input").eq(1).val(date);

    $("table tbody").prepend(rowClone);
}

function validateNewDate() {
    const newDate = $("#NewDateInput").val();
    let result = true;

    $("table tbody tr td input[type=date]").each((index, element) => {
        if ($(element).val() === newDate) {
            $("#NewDateInput").addClass("border-danger");
            result = false;
            return false;
        }
    });

    if (result) {
        $("#NewDateInput").removeClass("border-danger");
    }
    return result;
}

function validateAllDates() {
    let result = true;
    const elements = $("table tbody tr td input[type=date]");
    elements.removeClass("border-danger");
    elements.each((outerIndex, outerElement) => {
        elements.each((innerIndex, innerElement) => {
            if (outerIndex === innerIndex) return true;
            if ($(outerElement).val() === $(innerElement).val()) {
                $(outerElement).addClass("border-danger");
                $(innerElement).addClass("border-danger");
                result = false;
                return true;
            }
        });
    });

    return result;
}

////////  Event Handlers  ////////
function formSubmit_Clicked() {
    if (!validateAllDates()) return;
    removeTemplateRow();
    updateInputNames();
}

function addRowButton_Clicked() {
    const weightInput = $("#NewWeightInput");
    const dateInput = $("#NewDateInput");

    weightInput.removeClass("border-danger");
    dateInput.removeClass("border-danger");

    if (!validateNewDate()) return;

    const weight = weightInput.val();
    if (!weight) {
        weightInput.addClass("border-danger");
        return;
    }

    const date = dateInput.val();
    if (!date) {
        dateInput.addClass("border-danger");
        return;
    }

    addNewRow(weight, date);
    weightInput.val("");
}

$(document).ready(() => {
    validateNewDate();
});
