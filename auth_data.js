// Shared demo data helpers (front-end only, uses localStorage).
// Admin accounts come from the "initial system setup" (seeded below).
// Officer accounts are created by the Admin dashboard and saved to "unicare_officers".

const UC = {
    seed() {
        if (!localStorage.getItem("unicare_admins")) {
            localStorage.setItem("unicare_admins", JSON.stringify([
                { adminId: "ADM-001", name: "System Administrator", password: "Admin@123" }
            ]));
        }
        if (!localStorage.getItem("unicare_officers")) {
            localStorage.setItem("unicare_officers", JSON.stringify([
                { officerId: "OFF-001", name: "Rahim Uddin", email: "rahim@unicare.edu", password: "Officer@123" }
            ]));
        }
        if (!localStorage.getItem("unicare_complaints")) {
            localStorage.setItem("unicare_complaints", JSON.stringify([
                { id: "C-1001", studentId: "23-12345-1", studentName: "Nadia Islam", department: "CSE", category: "Facilities",
                  title: "Broken projector in Room 5B", description: "The projector in Room 5B has not worked for two weeks.",
                  priority: "High", status: "Pending", date: "2026-11-10", responses: [] },
                { id: "C-1002", studentId: "22-45678-2", studentName: "Tanvir Ahmed", department: "EEE", category: "Cafeteria",
                  title: "Unhygienic cafeteria tables", description: "Tables are not cleaned between lunch rushes.",
                  priority: "Medium", status: "In Progress", date: "2026-11-12", responses: [
                      { by: "Rahim Uddin", text: "We have informed the cafeteria manager.", date: "2026-11-13" }] },
                { id: "C-1003", studentId: "23-99887-3", studentName: "Sadia Rahman", department: "BBA", category: "Library",
                  title: "Library AC not working", description: "The 2nd floor reading area is very hot.",
                  priority: "Low", status: "Resolved", date: "2026-11-05", responses: [
                      { by: "Rahim Uddin", text: "AC repaired on 8 Nov.", date: "2026-11-08" }] }
            ]));
        }
    },
    get(key) { return JSON.parse(localStorage.getItem(key) || "[]"); },
    set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};
UC.seed();
