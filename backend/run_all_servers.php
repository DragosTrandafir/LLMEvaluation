<?php
// run_all_servers.php

// Path to Python inside the venv
$python = 'C:\\Users\\DragosTrandafiri\\PycharmProjects\\llm_evaluation_networks\\.venv\\Scripts\\python.exe';

// Project root (for backend imports)
$projectRoot = 'C:\\Users\\DragosTrandafiri\\PycharmProjects\\llm_evaluation_networks';
chdir($projectRoot);


// Define servers to launch
$servers = [
    'backend.network.udp_server',
    'backend.network.tcp_server',
//     'backend.response_llms.llms_responses'
];

// Create logs folder if missing
if (!is_dir('logs')) {
    mkdir('logs');
}

// Start each server in background with redirected output
foreach ($servers as $server) {
    $logFile = "logs/" . str_replace(['.', '\\'], '_', $server) . ".log";
    $cmd = "start /B \"\" \"$python\" -m $server > \"$logFile\" 2>&1";
    pclose(popen($cmd, "r"));
    echo "Started $server (logging to $logFile)\n";
}

echo "✅ All servers started successfully.\n";
?>