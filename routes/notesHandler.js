/**
 * Created by pablo on 21/06/14.
 */
module.exports = function (app) {
    var mockNotes = [{
            noteId: 1,
            content: "Hola esta es una nota de prueba",
            userId: "pablo"
        },
        {
            noteId: 2,
            content: "Otra nota de prueba",
            userId: "pablo"
        }
    ];

    console.log("GET /notes");
    app.get("/notes", function (req, res) {
        res.status(200).send(JSON.encode({notes: mockNotes}));
    });

    console.log("GET /notes/:noteId")
    app.get("/notes/:noteId", function(req, res) {
        var note = mockNotes.filter(function (note) {
            return req.params.noteId == note.noteId;
        })[0];
        if (note) {
            res.status(200).send(JSON.stringify(note));
        } else {
            res.status(404).send(JSON.stringify({}));
        }
    });



}
