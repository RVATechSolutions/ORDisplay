function Appointment(){
	var self = this;
	self.Time = arguments[0] || "TIME";
	self.Surgeon= arguments[1] || "";
	self.Patient = arguments[2] || "";
	self.PatType = arguments[3] || "";
	self.Location = arguments[4] || "";
	self.Procedure = arguments[5] || "";
	self.Warnings = arguments[6] || "";
	self.Comments = arguments[7] || "";
	self.Destination = arguments[8] || "";
};

function OperatingRoom(){
	var self = this;
	self.Name = arguments[0] || "";
	self.Anes = arguments[1] || "";
	self.CRNA = arguments[2] || "";
	self.RN1 = arguments[3] || "";
	self.RN2 = arguments[4] || "";
	self.Scrub1 = arguments[5] || "";
	self.Scrub2 = arguments[6] || "";
	self.Appointments = new Array();
};

function ViewModel(){
	var self = this;
	self.Rooms = ko.observableArray();
	self.Alert = ko.observable();
	self.News = ko.observable();
};

var vm;

$(function(){
	vm = new ViewModel();
	var data = mockDBAccess();
	for(var i = 0; i < data.length; i++){
		vm.Rooms.push(data[i]);
	}
	ko.applyBindings(vm);
});

function mockDBAccess(){
	var obj = new Array();
	for(var i = 0; i < 4; i++){
		var room = createMockRoom();
		room.Appointments.push(createMockAppointment());
		obj.push(room);
	}
	return obj;
}

function createMockRoom(){
	var name = "GEM OR 1";
	var anes = "Thomas";
	var crna = "Bailey";
	var rn1 = "Erickson";
	var	rn2 = "Lincoln";
	var scrub1 = "Brown"; 
	var scrub2 = "Green";
	return new OperatingRoom(name, anes, crna, rn1, rn2, scrub1, scrub2);
};

function createMockAppointment(){
	var time = "08:00";
	var surgeon= "Kaye";
	var patient = "Murphy";
	var patType = "SDC";
	var location = "PACU Phase I 10:44";
	var procedure = "Tonsilectomy";
	var warnings = "* ** ***";
	var comments = "";
	var destination = "HOME"
	return new Appointment(time, surgeon, patient, patType, location, procedure, warnings, comments, destination);
};