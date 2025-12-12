import { useState, useEffect } from "react";

const TestingDashboard = () => {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({ passed: 0, failed: 0, total: 0 });

  // Mock test data to demonstrate testing component
  const mockTests = [
    {
      id: 1,
      name: "renders TodoList component with initial todos",
      status: "passed",
      description: "Checks if TodoList renders with initial data",
    },
    {
      id: 2,
      name: "displays todos with correct initial completion status",
      status: "passed",
      description: "Verifies todo completion states are displayed correctly",
    },
    {
      id: 3,
      name: "adds a new todo when form is submitted",
      status: "passed",
      description: "Tests adding new todos through the form",
    },
    {
      id: 4,
      name: "does not add empty todo when form is submitted",
      status: "passed",
      description: "Ensures empty todos are not added",
    },
    {
      id: 5,
      name: "toggles todo completion status when clicked",
      status: "passed",
      description: "Tests toggling todo completion state",
    },
    {
      id: 6,
      name: "deletes a todo when delete button is clicked",
      status: "passed",
      description: "Verifies todo deletion functionality",
    },
    {
      id: 7,
      name: "trims whitespace from todo text",
      status: "passed",
      description: "Tests that whitespace is trimmed from todo input",
    },
  ];

  const runTests = () => {
    setIsRunning(true);
    setTestResults([]);

    // Simulate running tests with delays
    mockTests.forEach((test, index) => {
      setTimeout(() => {
        setTestResults((prev) => [
          ...prev,
          { ...test, status: Math.random() > 0.1 ? "passed" : "failed" },
        ]);
        if (index === mockTests.length - 1) {
          setIsRunning(false);
        }
      }, (index + 1) * 500);
    });
  };

  useEffect(() => {
    const passed = testResults.filter(
      (test) => test.status === "passed"
    ).length;
    const failed = testResults.filter(
      (test) => test.status === "failed"
    ).length;
    setStats({
      passed,
      failed,
      total: testResults.length,
    });
  }, [testResults]);

  const getStatusColor = (status) => {
    switch (status) {
      case "passed":
        return "#4CAF50";
      case "failed":
        return "#f44336";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <div className="testing-dashboard">
      <h2>Testing Dashboard</h2>

      <div className="test-controls">
        <button
          onClick={runTests}
          disabled={isRunning}
          className="run-tests-btn"
        >
          {isRunning ? "Running Tests..." : "Run Tests"}
        </button>
      </div>

      <div className="test-stats">
        <div className="stat">
          <span className="stat-label">Total Tests:</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Passed:</span>
          <span className="stat-value passed">{stats.passed}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Failed:</span>
          <span className="stat-value failed">{stats.failed}</span>
        </div>
      </div>

      <div className="test-results">
        <h3>Test Results</h3>
        {testResults.length === 0 && !isRunning && (
          <p className="no-results">Click "Run Tests" to see test results</p>
        )}
        {isRunning && <p className="running">Running tests...</p>}
        <ul className="test-list">
          {testResults.map((test) => (
            <li key={test.id} className={`test-item ${test.status}`}>
              <div className="test-header">
                <span
                  className="test-status"
                  style={{ backgroundColor: getStatusColor(test.status) }}
                >
                  {test.status.toUpperCase()}
                </span>
                <span className="test-name">{test.name}</span>
              </div>
              <p className="test-description">{test.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .testing-dashboard {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
        }

        .test-controls {
          margin-bottom: 20px;
        }

        .run-tests-btn {
          background-color: #2196f3;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .run-tests-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .test-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          padding: 15px;
          background-color: white;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-label {
          font-weight: bold;
          color: #666;
          margin-bottom: 5px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: bold;
        }

        .stat-value.passed {
          color: #4caf50;
        }

        .stat-value.failed {
          color: #f44336;
        }

        .test-results h3 {
          margin-bottom: 15px;
          color: #333;
        }

        .no-results,
        .running {
          text-align: center;
          color: #666;
          font-style: italic;
          padding: 20px;
        }

        .test-list {
          list-style: none;
          padding: 0;
        }

        .test-item {
          background-color: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 15px;
          margin-bottom: 10px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .test-header {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }

        .test-status {
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          margin-right: 10px;
        }

        .test-name {
          font-weight: bold;
          color: #333;
        }

        .test-description {
          color: #666;
          margin: 0;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default TestingDashboard;
