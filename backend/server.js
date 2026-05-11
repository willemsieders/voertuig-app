const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware — wordt uitgevoerd bij élk request
app.use(cors());              // sta cross-origin requests toe
app.use(express.json());      // zodat je JSON uit request.body kunt lezen

// Data — tijdelijk in geheugen, straks in database
const voertuigen = [
  { id: 1, kenteken: "AB-123-C", type: "Kraan",        project: "Brug A12",    status: "ingezet" },
  { id: 2, kenteken: "DE-456-F", type: "Vrachtwagen",  project: "-",           status: "beschikbaar" },
  { id: 3, kenteken: "GH-789-I", type: "Graafmachine", project: "Depot Noord", status: "onderhoud" },
];

// GET /voertuigen — geef alle voertuigen terug
app.get('/voertuigen', (req, res) => {
  res.json(voertuigen);
});

// GET /voertuigen/:id — geef één voertuig terug
app.get('/voertuigen/:id', (req, res) => {
  const voertuig = voertuigen.find(v => v.id === parseInt(req.params.id));

  if (!voertuig) {
    return res.status(404).json({ error: 'Voertuig niet gevonden' });
  }

  res.json(voertuig);
});

// PUT /voertuigen/:id — verander een voertuig
app.put('/voertuigen/:id', (req, res) => {
const index = voertuigen.findIndex(v => v.id === parseInt(req.params.id));
if (index === -1) return res.status(404).json({ error: 'Voertuig niet gevonden' });

voertuigen[index].kenteken = kenteken;
voertuigen[index].type = type;
voertuigen[index].project = project || '-';
voertuigen[index].status = status;

res.json(voertuigen[index]);

const { kenteken, type, project, status } = req.body;

  // Validatie
  if (!kenteken || !type || !status) {
    return res.status(400).json({ error: 'kenteken, type en status zijn verplicht' });
  }

  // Update de eigenschappen
  voertuig.kenteken = kenteken;
  voertuig.type = type;
  voertuig.project = project || '-';
  voertuig.status = status;

  res.json(voertuig);
});

// POST /voertuigen — voeg een voertuig toe
app.post('/voertuigen', (req, res) => {
  const { kenteken, type, project, status } = req.body;
  console.log('Body ontvangen:', req.body); // ← tijdelijk toevoegen

  // Validatie — vertrouw nooit blindelings wat binnenkomt
  if (!kenteken || !type || !status) {
    return res.status(400).json({ error: 'kenteken, type en status zijn verplicht' });
  }

  const nieuw = {
    id: voertuigen.length + 1,
    kenteken,
    type,
    project: project || '-',
    status,
  };

  voertuigen.push(nieuw);
  res.status(201).json(nieuw); // 201 = Created
});

// DELETE /voertuigen/:id — verwijder een voertuig
app.delete('/voertuigen/:id', (req, res) => {
  const index = voertuigen.findIndex(v => v.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Voertuig niet gevonden' });
  }

  voertuigen.splice(index, 1);
  res.status(204).send(); // 204 = No Content (verwijderd, niets terug te sturen)
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});