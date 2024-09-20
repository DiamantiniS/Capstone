Fitness Tracker Web Application

Overview
Fitness Tracker è un'applicazione web progettata per aiutare gli utenti a gestire i loro obiettivi di fitness e nutrizione. L'app consente agli utenti di monitorare i progressi del loro peso, creare piani di allenamento personalizzati, tracciare l'assunzione di nutrienti e consultare un chatbot per assistenza. Il progetto utilizza un'infrastruttura backend robusta con una gestione sicura degli utenti e delle loro informazioni.

Features

Gestione degli Obiettivi di Fitness: Gli utenti possono impostare obiettivi personalizzati per il peso e il sollevamento pesi e monitorare i progressi attraverso grafici interattivi.
Monitoraggio Nutrizione: Tracciamento delle calorie giornaliere e dei macronutrienti consumati, con report settimanali e mensili.
Piani di Allenamento: Creazione di piani di allenamento su misura con la possibilità di aggiungere esercizi, ripetizioni, set e tempi di riposo.
Integrazione Chatbot: Un chatbot è disponibile per assistere gli utenti nell'uso dell'app, rispondere a domande comuni e fornire suggerimenti su allenamenti e nutrizione.
Gestione Utenti: Utilizzo di ASP.NET Identity per la gestione di utenti e amministratori, con autenticazione sicura e recupero password.

Technologies Used

Backend

ASP.NET Core: Gestione della logica server e delle API RESTful.
Entity Framework Core: Accesso e gestione dei dati con supporto per SQL Server.
SQL Server: Database relazionale per memorizzare informazioni sugli utenti, allenamenti e nutrizione.
ASP.NET Identity: Sistema di autenticazione e gestione degli utenti.

Frontend

HTML5, CSS3, Bootstrap: Struttura e layout della pagina, design responsive.
JavaScript: Interattività della pagina e dinamismo dei contenuti.
Security
SSL/TLS: Crittografia delle comunicazioni client-server.
ASP.NET Identity: Autenticazione sicura e autorizzazione utenti.
Setup Instructions
Prerequisites
Assicurati di avere installato i seguenti strumenti:

.NET SDK: Scaricabile da qui.
SQL Server: Per la gestione del database.
Node.js: Se necessario per la gestione di pacchetti frontend.
Installation Steps
Clone the Repository

bash
Copia codice
git clone https://github.com/tuo-username/fitness-tracker.git
cd fitness-tracker
Configure Database

Assicurati che SQL Server sia in esecuzione e aggiorna la stringa di connessione nel file appsettings.json per puntare alla tua istanza di SQL Server locale.
Esegui le migrazioni per creare il database:
bash
Copia codice
dotnet ef database update
Run the Application

Compila e avvia l'applicazione:
bash
Copia codice
dotnet run
L'app sarà accessibile all'indirizzo http://localhost:5000 (o specificato nella configurazione).
(Optional) Frontend Development Se sono necessarie modifiche al frontend, modifica i file HTML/CSS/JavaScript presenti nelle rispettive cartelle del progetto. Non è necessario compilare il frontend separatamente se il progetto utilizza solo librerie integrate.
