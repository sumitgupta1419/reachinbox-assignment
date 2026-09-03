import { useState } from "react";
import "./App.css";

type Email = {
  id: number;
  email: string;
  subject: string;
  scheduledTime: string;
  status: string;
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"scheduled" | "sent">(
    "scheduled"
  );

  const [showCompose, setShowCompose] = useState(false);

  const [scheduledEmails, setScheduledEmails] = useState<Email[]>([]);

  const [sentEmails] = useState<Email[]>([]);

  // LOGIN PAGE
  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">

          <h1>ReachInbox</h1>

          <p className="subtitle">
            Email Scheduler
          </p>

          <p className="login-description">
            Schedule and manage your email campaigns easily.
          </p>

          <button
            className="google-button"
            onClick={() => setLoggedIn(true)}
          >
            <span>G</span>
            Continue with Google
          </button>

        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div>
          <h1 className="logo">
            ReachInbox
          </h1>

          <p className="header-subtitle">
            Email Scheduler
          </p>
        </div>

        <div className="user-section">

          <div className="user-info">
            <strong>Sumit Kumar Gupta</strong>
            <span>sumit@example.com</span>
          </div>

          <div className="avatar">
            S
          </div>

          <button
            className="logout-button"
            onClick={() => setLoggedIn(false)}
          >
            Logout
          </button>

        </div>

      </header>

      {/* MAIN */}
      <main className="main">

        <div className="page-header">

          <div>
            <h2>
              Email Campaigns
            </h2>

            <p>
              Schedule and manage your emails
            </p>
          </div>

          <button
            className="compose-button"
            onClick={() => setShowCompose(true)}
          >
            + Compose New Email
          </button>

        </div>

        {/* TABS */}
        <div className="email-card">

          <div className="tabs">

            <button
              className={
                activeTab === "scheduled"
                  ? "tab active"
                  : "tab"
              }
              onClick={() => setActiveTab("scheduled")}
            >
              Scheduled Emails
            </button>

            <button
              className={
                activeTab === "sent"
                  ? "tab active"
                  : "tab"
              }
              onClick={() => setActiveTab("sent")}
            >
              Sent Emails
            </button>

          </div>

          {/* TABLE */}
          {activeTab === "scheduled" ? (
            <EmailTable
              emails={scheduledEmails}
              emptyText="No scheduled emails"
            />
          ) : (
            <EmailTable
              emails={sentEmails}
              emptyText="No sent emails"
            />
          )}

        </div>

      </main>

      {/* COMPOSE MODAL */}
      {showCompose && (
        <ComposeModal
          onClose={() => setShowCompose(false)}
          onSchedule={(email) => {
            setScheduledEmails((previous) => [
              ...previous,
              email,
            ]);

            setShowCompose(false);
          }}
        />
      )}

    </div>
  );
}


/* =========================
   EMAIL TABLE
========================= */

function EmailTable({
  emails,
  emptyText,
}: {
  emails: Email[];
  emptyText: string;
}) {

  if (emails.length === 0) {
    return (
      <div className="empty-state">

        <div className="email-icon">
          ✉
        </div>

        <h3>
          {emptyText}
        </h3>

        <p>
          Your emails will appear here.
        </p>

      </div>
    );
  }

  return (
    <table>

      <thead>
        <tr>
          <th>Email</th>
          <th>Subject</th>
          <th>Scheduled Time</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>

        {emails.map((email) => (
          <tr key={email.id}>

            <td>
              {email.email}
            </td>

            <td>
              {email.subject}
            </td>

            <td>
              {email.scheduledTime}
            </td>

            <td>
              <span className="status">
                {email.status}
              </span>
            </td>

          </tr>
        ))}

      </tbody>

    </table>
  );
}


/* =========================
   COMPOSE MODAL
========================= */

function ComposeModal({
  onClose,
  onSchedule,
}: {
  onClose: () => void;
  onSchedule: (email: Email) => void;
}) {

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [startTime, setStartTime] = useState("");
  const [delay, setDelay] = useState("2");
  const [hourlyLimit, setHourlyLimit] = useState("200");

  const [emailCount, setEmailCount] = useState(0);

  const handleCSV = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {

      const text = reader.result as string;

      const emails =
        text.match(
          /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
        ) || [];

      const uniqueEmails = [
        ...new Set(emails),
      ];

      setEmailCount(uniqueEmails.length);
    };

    reader.readAsText(file);
  };


  const handleSchedule = () => {

    if (
      !subject ||
      !body ||
      !startTime ||
      emailCount === 0
    ) {
      alert(
        "Please fill all fields and upload a CSV containing email addresses."
      );

      return;
    }

    const email: Email = {
      id: Date.now(),
      email: `${emailCount} recipients`,
      subject: subject,
      scheduledTime: startTime,
      status: "scheduled",
    };

    onSchedule(email);

    console.log({
      subject,
      body,
      emailCount,
      startTime,
      delay,
      hourlyLimit,
    });
  };


  return (
    <div className="modal-overlay">

      <div className="modal">

        {/* MODAL HEADER */}

        <div className="modal-header">

          <div>
            <h2>
              Compose New Email
            </h2>

            <p>
              Create and schedule your email campaign
            </p>
          </div>

          <button
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* FORM */}

        <div className="form">

          <label>
            Subject
          </label>

          <input
            type="text"
            placeholder="Enter email subject"
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
          />


          <label>
            Body
          </label>

          <textarea
            rows={5}
            placeholder="Write your email..."
            value={body}
            onChange={(e) =>
              setBody(e.target.value)
            }
          />


          <label>
            Email Leads CSV
          </label>

          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleCSV}
          />

          {emailCount > 0 && (
            <p className="success">
              ✓ {emailCount} email addresses detected
            </p>
          )}


          <label>
            Start Time
          </label>

          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) =>
              setStartTime(e.target.value)
            }
          />


          <div className="form-row">

            <div>

              <label>
                Delay Between Emails
              </label>

              <input
                type="number"
                min="1"
                value={delay}
                onChange={(e) =>
                  setDelay(e.target.value)
                }
              />

              <small>
                seconds
              </small>

            </div>


            <div>

              <label>
                Hourly Limit
              </label>

              <input
                type="number"
                min="1"
                value={hourlyLimit}
                onChange={(e) =>
                  setHourlyLimit(e.target.value)
                }
              />

            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="modal-footer">

          <button
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="schedule-button"
            onClick={handleSchedule}
          >
            Schedule Emails
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;