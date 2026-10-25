const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const { getAnswerWithRetry } = require("../src/services/ai.service");

// Academic Benchmark Dataset: 25 representative curriculum questions with key concepts
const benchmarkDataset = [
  // --- Data Structures & Algorithms ---
  {
    topic: "Data Structures",
    question: "What is the average and worst-case time complexity of QuickSort, and why does the worst case occur?",
    mustInclude: [
      ["o(n log n)", "o(n*log n)", "o(nlogn)"],
      ["o(n^2)", "o(n2)", "quadratic"],
      ["pivot", "partition"]
    ]
  },
  {
    topic: "Data Structures",
    question: "What are the primary differences between an Array and a Linked List regarding memory allocation and insertion complexity?",
    mustInclude: [
      ["contiguous", "continuous", "fixed"],
      ["pointer", "node", "dynamic", "reference"],
      ["o(1)", "o(n)"]
    ]
  },
  {
    topic: "Data Structures",
    question: "Explain how a Hash Table handles collisions using Separate Chaining.",
    mustInclude: [
      ["collision"],
      ["linked list", "chain", "bucket", "list"]
    ]
  },
  {
    topic: "Algorithms",
    question: "What is the time complexity of Dijkstra's algorithm implemented with a min-priority queue (binary heap)?",
    mustInclude: [
      ["o((v + e) log v)", "o((e + v) log v)", "o(e log v)", "o(v log v + e log v)"]
    ]
  },
  {
    topic: "Algorithms",
    question: "What two main properties must a problem have to be solved using Dynamic Programming?",
    mustInclude: [
      ["optimal substructure"],
      ["overlapping subproblems", "overlapping sub-problems"]
    ]
  },

  // --- Database Management Systems ---
  {
    topic: "Database",
    question: "What does ACID stand for in DBMS and what does each property ensure?",
    mustInclude: [
      ["atomicity"],
      ["consistency"],
      ["isolation"],
      ["durability"]
    ]
  },
  {
    topic: "Database",
    question: "What is the difference between a clustered and a non-clustered index in a relational database?",
    mustInclude: [
      ["physical", "order", "sort"],
      ["pointer", "b-tree", "separate", "leaf"]
    ]
  },
  {
    topic: "Database",
    question: "Explain the purpose of Database Normalization and define 3NF (Third Normal Form).",
    mustInclude: [
      ["redundancy", "anomaly"],
      ["transitive", "transitive dependency", "2nf"]
    ]
  },
  {
    topic: "Database",
    question: "What is the difference between SQL (relational) and NoSQL (document-based) databases regarding schema and scaling?",
    mustInclude: [
      ["structured", "fixed schema", "schema-less", "dynamic schema", "flexible"],
      ["vertical", "horizontal", "scale"]
    ]
  },

  // --- Operating Systems ---
  {
    topic: "Operating Systems",
    question: "What are the four Coffman conditions necessary for a deadlock to occur in an operating system?",
    mustInclude: [
      ["mutual exclusion"],
      ["hold and wait"],
      ["no preemption"],
      ["circular wait"]
    ]
  },
  {
    topic: "Operating Systems",
    question: "What is the difference between a process and a thread in terms of memory sharing?",
    mustInclude: [
      ["address space", "isolated memory", "independent memory", "separate memory"],
      ["share", "shared memory", "same address space"]
    ]
  },
  {
    topic: "Operating Systems",
    question: "What is Thrashing in virtual memory and how does the operating system detect or handle it?",
    mustInclude: [
      ["page fault", "paging", "swapping"],
      ["cpu utilization", "working set", "degree of multiprogramming"]
    ]
  },
  {
    topic: "Operating Systems",
    question: "Explain the difference between preemptive and non-preemptive CPU scheduling.",
    mustInclude: [
      ["preemptive", "interrupt", "forced", "yield", "relinquish"],
      ["terminates", "voluntarily", "waits", "non-preemptive"]
    ]
  },

  // --- Computer Networks ---
  {
    topic: "Computer Networks",
    question: "Explain the three-way handshake process used by TCP to establish a connection.",
    mustInclude: [
      ["syn"],
      ["syn-ack", "syn/ack", "syn ack"],
      ["ack"]
    ]
  },
  {
    topic: "Computer Networks",
    question: "Explain the key differences between TCP and UDP in terms of reliability and connection state.",
    mustInclude: [
      ["tcp is connection-oriented", "connection-oriented"],
      ["udp is connectionless", "connectionless"],
      ["reliable", "guaranteed", "unreliable", "best-effort"]
    ]
  },
  {
    topic: "Computer Networks",
    question: "What is the purpose of DNS and what transport protocol does it typically use for standard queries?",
    mustInclude: [
      ["domain name", "ip address", "resolve", "translate"],
      ["udp", "port 53"]
    ]
  },
  {
    topic: "Computer Networks",
    question: "What is the difference between symmetric and asymmetric encryption in HTTPS/TLS?",
    mustInclude: [
      ["same key", "single key", "shared key", "secret key"],
      ["public key", "private key", "pair of keys", "key pair"]
    ]
  },

  // --- Mathematics & Logic ---
  {
    topic: "Mathematics",
    question: "What is the derivative of f(x) = sin(2x) with respect to x?",
    mustInclude: [
      ["2cos(2x)", "2 cos(2x)", "2*cos(2x)", "2 \\cos(2x)"]
    ]
  },
  {
    topic: "Mathematics",
    question: "State Bayes' Theorem formula and define prior and posterior probability.",
    mustInclude: [
      ["p(a|b)", "p(a | b)", "p(b|a)"],
      ["prior"],
      ["posterior"]
    ]
  },
  {
    topic: "Mathematics",
    question: "What is an eigenvalue and eigenvector of a matrix A?",
    mustInclude: [
      ["av = \\lambda v", "ax = \\lambda x", "av = lambda v", "ax = lambda x", "scalar multiple"],
      ["non-zero", "nonzero", "vector"]
    ]
  },

  // --- Software Engineering & Object-Oriented Design ---
  {
    topic: "Software Engineering",
    question: "Explain the four core principles of Object-Oriented Programming (OOP).",
    mustInclude: [
      ["encapsulation"],
      ["inheritance"],
      ["polymorphism"],
      ["abstraction"]
    ]
  },
  {
    topic: "Software Engineering",
    question: "What is the difference between Authentication and Authorization in web security?",
    mustInclude: [
      ["who you are", "identity", "identifies", "credentials"],
      ["permissions", "access", "what you can do", "privileges"]
    ]
  },
  {
    topic: "Software Engineering",
    question: "What does the Single Responsibility Principle (SRP) in SOLID states?",
    mustInclude: [
      ["one reason to change", "single responsibility", "only one responsibility", "one purpose"]
    ]
  },
  {
    topic: "Software Engineering",
    question: "Explain what a RESTful API is and name four standard HTTP verbs.",
    mustInclude: [
      ["stateless", "representational state transfer"],
      ["get", "post", "put", "delete"]
    ]
  },
  {
    topic: "Software Engineering",
    question: "What is Cross-Site Scripting (XSS) and how can developers prevent it?",
    mustInclude: [
      ["malicious script", "javascript", "injection", "client-side"],
      ["sanitize", "escaping", "validation", "content security policy", "csp"]
    ]
  }
];

// Helper to normalize text for flexible matching
function normalizeText(text) {
  return text.toLowerCase().replace(/[\r\n]+/g, " ");
}

async function runEvaluation() {
  console.log("================================================================");
  console.log(`Starting Academic Benchmark Evaluation on ${benchmarkDataset.length} Questions`);
  console.log(`Model: ${process.env.GEMINI_MODEL || "gemini-2.5-flash"}`);
  console.log("================================================================\n");

  let correctCount = 0;
  const results = [];
  const topicStats = {};

  const startTime = Date.now();

  for (let i = 0; i < benchmarkDataset.length; i++) {
    const item = benchmarkDataset[i];
    topicStats[item.topic] = topicStats[item.topic] || { total: 0, passed: 0 };
    topicStats[item.topic].total++;

    const qStart = Date.now();
    let responseText = "";
    let errorMsg = null;
    let passed = false;
    let missingGroups = [];

    try {
      responseText = await getAnswerWithRetry(item.question);
      const normalized = normalizeText(responseText);

      // Check each required concept group (at least one alternative in the group must match)
      for (const conceptGroup of item.mustInclude) {
        const matchesAny = conceptGroup.some((kw) => normalized.includes(kw.toLowerCase()));
        if (!matchesAny) {
          missingGroups.push(conceptGroup[0]);
        }
      }

      passed = missingGroups.length === 0;
    } catch (err) {
      errorMsg = err.message;
      passed = false;
    }

    const duration = ((Date.now() - qStart) / 1000).toFixed(2);

    if (passed) {
      correctCount++;
      topicStats[item.topic].passed++;
      console.log(`[PASS] Q${String(i + 1).padStart(2, "0")} | ${item.topic.padEnd(20)} | (${duration}s)`);
    } else {
      const reason = errorMsg ? `Error: ${errorMsg}` : `Missing concepts: [${missingGroups.join(", ")}]`;
      console.log(`[FAIL] Q${String(i + 1).padStart(2, "0")} | ${item.topic.padEnd(20)} | (${duration}s) -> ${reason}`);
    }

    results.push({
      id: i + 1,
      topic: item.topic,
      question: item.question,
      passed,
      durationSeconds: parseFloat(duration),
      missingConcepts: missingGroups,
      error: errorMsg,
      responseExcerpt: responseText ? responseText.slice(0, 180).replace(/\n/g, " ") + "..." : null,
    });

    // Small delay between questions to avoid hitting rate limits on free-tier keys
    await new Promise((res) => setTimeout(res, 800));
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const accuracy = ((correctCount / benchmarkDataset.length) * 100).toFixed(1);

  console.log("\n================================================================");
  console.log("                      EVALUATION SUMMARY                        ");
  console.log("================================================================");
  console.log(`Total Evaluated : ${benchmarkDataset.length}`);
  console.log(`Passed          : ${correctCount}`);
  console.log(`Failed          : ${benchmarkDataset.length - correctCount}`);
  console.log(`Overall Accuracy: ${accuracy}%`);
  console.log(`Total Time      : ${totalTime}s`);
  console.log("----------------------------------------------------------------");
  console.log("Performance Breakdown by Topic:");
  for (const [topic, stats] of Object.entries(topicStats)) {
    const topicPct = ((stats.passed / stats.total) * 100).toFixed(0);
    console.log(` - ${topic.padEnd(22)}: ${stats.passed}/${stats.total} (${topicPct}%)`);
  }
  console.log("================================================================\n");

  // Save full benchmark report to JSON
  const reportPath = path.join(__dirname, "benchmark-results.json");
  const report = {
    evaluatedAt: new Date().toISOString(),
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    totalQuestions: benchmarkDataset.length,
    passedQuestions: correctCount,
    failedQuestions: benchmarkDataset.length - correctCount,
    accuracyPercentage: parseFloat(accuracy),
    durationSeconds: parseFloat(totalTime),
    topicBreakdown: topicStats,
    details: results,
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`Full report saved to: ${reportPath}`);
}

runEvaluation();
