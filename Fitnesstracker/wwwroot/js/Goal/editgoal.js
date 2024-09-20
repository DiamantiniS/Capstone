function typeRadio_Changed() {
    const isWeightliftingChecked = $("#WeightliftingRadio:checked").length === 1;
    $("#WeightliftingGroup").toggleClass("d-none", !isWeightliftingChecked);
    $("#TimedGroup").toggleClass("d-none", isWeightliftingChecked);
}

$(document).ready(typeRadio_Changed);

