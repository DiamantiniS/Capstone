function addNewSession() {
    createSessionTable();
    createActivityTable();
    createSessionLI();
    const index = $("#SessionList li").length - 1;
    showActivityTable(index);
    setSessionSelection(index);
}

function createSessionTable() {
    const clone = $("#SessionTemplate").clone();
    clone.removeAttr("id").removeClass("d-none").attr("id", "CurrentSessionForm");
    $("#SessionContainer").append(clone);
}

function createActivityTable() {
    const tableClone = $("#ActivityTemplate").clone();
    tableClone.removeAttr("id");
    tableClone.insertBefore("#AddActivityButton");
}

function createSessionLI() {
    const clone = $("#SessionListTemplate li").clone();
    $("#SessionList").append(clone);
    $("#SessionList li").last().text($("#SessionContainer .sessionForm").last().find("input").first().val());
}

function setSessionSelection(index) {
    const element = $($("#SessionList li")[index]);

    element.siblings().removeClass("active");
    element.addClass("active");

    $("#CurrentSessionForm").removeAttr("id").addClass("d-none");
    const newSelectedForm = $($("#SessionContainer .sessionForm")[index]);
    newSelectedForm.attr("id", "CurrentSessionForm").removeClass("d-none");
}

function showActivityTable(sessionIndex) {
    $("#AddActivityButton").removeClass("d-none");
    $("#ActivityContainer .activityForm").addClass("d-none").removeAttr("id"); //Hide current form
    $("#ActivityContainer .activityForm").eq(sessionIndex).removeClass("d-none").attr("id", "CurrentActivityForm");
}

//////////////////////
//  Event handlers //
/////////////////////
function sessionListItem_Clicked(element) {
    const index = $("#SessionList li").index(element);
    setSessionSelection(index);
    showActivityTable(index);
}

function sessionName_Input(sender) {
    const text = $(sender).val();
    $("#SessionList li.active").text(text);
}

function addActivity_Clicked() {
    const rowClone = $("#ActivityRowTemplate").clone();
    rowClone.removeAttr("id");
    $("#CurrentActivityForm").find("tbody").append(rowClone);
}

function planName_Input(element) {
    $("#PlanNameHeader").text($(element).val());
}

function deleteSession_Clicked(sender) {
    const sessionID = $(sender).closest("tbody").find("input[type=hidden]").val();
    $.post("/Workout/DeleteSession", { SessionID: sessionID }).always(function () {
        $(sender).closest("table").remove();
        $("#SessionList li.active").remove();
        $("#CurrentActivityForm").remove();
    });
}

function deleteActivity_Clicked(sender) {
    const activityID = $(sender).closest("tr").find("input[type=hidden]").val();
    $.post("/Workout/DeleteActivity", { ActivityID: activityID }).always(function () {
        $(sender).closest("tr").remove();
    });
}

function formPreSubmit() {
    const sessions = [];

    $("#SessionContainer .sessionForm").each(function (index, element) {
        const name = $(element).find("input").eq(0).val();
        const dayNumber = Number($(element).find("input").eq(1).val());

        const activityForm = $("#ActivityContainer .activityForm").eq(index);
        const activities = [];
        activityForm.find("tbody tr").each(function (innerIndex, innerElement) {
            const act = {
                Name: $(innerElement).find("input").eq(0).val(),
                Quantity: $(innerElement).find("input").eq(1).val(),
                Sets: Number($(innerElement).find("input").eq(2).val()),
                RestPeriodSeconds: Number($(innerElement).find("input").eq(3).val())
            };
            activities.push(act);
        });

        const session = {
            Name: name,
            DayNumber: dayNumber,
            Activities: activities
        };
        sessions.push(session);
    });

    $("#SessionJSONInput").val(JSON.stringify(sessions));
}
