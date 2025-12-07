import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Play,
  Settings2,
  Trash2,
  X,
  Search,
  Bot,
  Send,
  Save,
  Zap,
  Globe,
  Database,
  Mail,
  MessageCircle,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Loader2,
  GitBranch,
  MousePointer2,
} from "lucide-react";
import {
  Button,
  Card,
  Input,
  Badge,
  Modal,
  Drawer,
  Textarea,
} from "../components/ui/design-system";

// --- Types ---
type NodeType =
  | "webhook"
  | "llm"
  | "http"
  | "condition"
  | "gmail"
  | "slack"
  | "sheets"
  | "postgres";
type NodeStatus = "idle" | "running" | "success" | "error" | "waiting";

interface NodeData {
  label: string;
  description?: string;
  config?: Record<string, any>;
}

interface Node {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  data: NodeData;
  status: NodeStatus;
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

// --- Node Library Data ---
const nodeLibrary = [
  {
    type: "webhook",
    label: "Webhook",
    icon: Zap,
    category: "Trigger",
    description: "Start workflow on incoming request",
  },
  {
    type: "gmail",
    label: "Gmail",
    icon: Mail,
    category: "Integration",
    description: "Send or read emails",
  },
  {
    type: "slack",
    label: "Slack",
    icon: MessageCircle,
    category: "Integration",
    description: "Post messages to channels",
  },
  {
    type: "sheets",
    label: "Google Sheets",
    icon: FileSpreadsheet,
    category: "Data",
    description: "Read/Write to spreadsheet",
  },
  {
    type: "llm",
    label: "AI Model",
    icon: Bot,
    category: "AI",
    description: "Generate text using Gemini",
  },
  {
    type: "http",
    label: "HTTP Request",
    icon: Globe,
    category: "Core",
    description: "Make API calls",
  },
  {
    type: "postgres",
    label: "PostgreSQL",
    icon: Database,
    category: "Data",
    description: "Execute SQL queries",
  },
  {
    type: "condition",
    label: "If / Else",
    icon: GitBranch,
    category: "Logic",
    description: "Branching logic",
  },
];

const WorkflowBuilder = () => {
  // --- State ---
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "1",
      type: "webhook",
      x: 100,
      y: 150,
      data: { label: "Start Trigger" },
      status: "idle",
    },
    {
      id: "2",
      type: "llm",
      x: 500,
      y: 200,
      data: { label: "Analyze Input" },
      status: "idle",
    },
  ]);
  const [edges, setEdges] = useState<Edge[]>([
    { id: "e1-2", source: "1", target: "2" },
  ]);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isNodeLibraryOpen, setIsNodeLibraryOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchNodeTerm, setSearchNodeTerm] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "model"; text: string }[]
  >([
    {
      role: "model",
      text: 'Hi! I can help you build this workflow. Try saying "Add a Gmail node" or "Run the workflow".',
    },
  ]);
  const [isRunning, setIsRunning] = useState(false);

  // Connection State
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // --- Helpers ---
  const getNodeIcon = (type: string) => {
    const n = nodeLibrary.find((n) => n.type === type);
    return n ? n.icon : Zap;
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case "webhook":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "llm":
        return "bg-purple-100 text-purple-600 border-purple-200";
      case "condition":
        return "bg-orange-100 text-orange-600 border-orange-200";
      case "gmail":
        return "bg-red-100 text-red-600 border-red-200";
      case "slack":
        return "bg-emerald-100 text-emerald-600 border-emerald-200";
      case "http":
        return "bg-slate-100 text-slate-600 border-slate-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const updateNodeData = (id: string, newData: Partial<NodeData>) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...newData } } : n
      )
    );
  };

  const handleAddNode = (
    type: NodeType,
    position?: { x: number; y: number }
  ) => {
    const newNode: Node = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: position ? position.x : 100 + Math.random() * 200,
      y: position ? position.y : 100 + Math.random() * 200,
      data: {
        label: nodeLibrary.find((n) => n.type === type)?.label || "New Node",
      },
      status: "idle",
    };
    setNodes((prev) => [...prev, newNode]);
    setIsNodeLibraryOpen(false);
    return newNode;
  };

  const deleteNode = (id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setEdges((prev) => prev.filter((e) => e.source !== id && e.target !== id));
    if (selectedNode?.id === id) setSelectedNode(null);
  };

  // --- Execution Engine ---
  const executeNode = async (nodeId: string, visited: Set<string>) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    // Set running
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, status: "running" } : n))
    );

    // Simulate Processing Time (1s)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Set Success
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, status: "success" } : n))
    );

    // Find neighbors
    const outgoingEdges = edges.filter((e) => e.source === nodeId);
    const nextNodeIds = outgoingEdges.map((e) => e.target);

    // Execute next nodes in parallel
    await Promise.all(nextNodeIds.map((id) => executeNode(id, visited)));
  };

  const handleRunWorkflow = async () => {
    if (isRunning) return;
    setIsRunning(true);

    // Reset statuses
    setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" })));

    // Find roots (nodes with no incoming edges or specific triggers)
    // For simplicity, we start with 'webhook' type or any node with no incoming edges
    const incomingEdgeTargets = new Set(edges.map((e) => e.target));
    const rootNodes = nodes.filter(
      (n) => !incomingEdgeTargets.has(n.id) || n.type === "webhook"
    );

    if (rootNodes.length === 0 && nodes.length > 0) {
      // Fallback for cyclic graphs or no clear root, start with first
      await executeNode(nodes[0].id, new Set());
    } else {
      await Promise.all(
        rootNodes.map((node) => executeNode(node.id, new Set()))
      );
    }

    setIsRunning(false);
  };

  // --- Chat Bot Logic (Function Calling Simulation) ---
  const processChatCommand = async (text: string) => {
    const lowerText = text.toLowerCase();

    // 1. Add Node
    if (lowerText.includes("add") || lowerText.includes("create")) {
      const typeMatch = nodeLibrary.find(
        (n) =>
          lowerText.includes(n.label.toLowerCase()) ||
          lowerText.includes(n.type)
      );
      if (typeMatch) {
        const newNode = handleAddNode(typeMatch.type as NodeType, {
          x: 300,
          y: 300,
        });
        return `I've added a **${typeMatch.label}** node for you.`;
      }
    }

    // 2. Connect Nodes
    if (lowerText.includes("connect")) {
      // Simplistic name matching
      const nodeNames = nodes.map((n) => ({
        id: n.id,
        name: n.data.label.toLowerCase(),
      }));
      // Try to find two names in the string
      let source: string | null = null;
      let target: string | null = null;

      for (const n of nodeNames) {
        if (lowerText.includes(n.name)) {
          if (!source) source = n.id;
          else if (!target && n.id !== source) target = n.id;
        }
      }

      if (source && target) {
        setEdges((prev) => [
          ...prev,
          {
            id: `e-${source}-${target}-${Date.now()}`,
            source: source!,
            target: target!,
          },
        ]);
        return `Connected **${
          nodes.find((n) => n.id === source)?.data.label
        }** to **${nodes.find((n) => n.id === target)?.data.label}**.`;
      }
      return "I couldn't identify which nodes to connect. Please make sure the node names are unique and mentioned clearly.";
    }

    // 3. Run Workflow
    if (
      lowerText.includes("run") ||
      lowerText.includes("execute") ||
      lowerText.includes("test")
    ) {
      handleRunWorkflow();
      return "Running the workflow simulation now...";
    }

    // 4. Clear/Delete
    if (lowerText.includes("clear all") || lowerText.includes("reset")) {
      setNodes([]);
      setEdges([]);
      return "Canvas cleared.";
    }

    // Default AI response
    return "I can help you add nodes (e.g., 'Add Gmail'), connect them, or run the workflow. What would you like to do?";
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);

    // Simulate "Thinking"
    setTimeout(async () => {
      const response = await processChatCommand(userMsg);
      setChatMessages((prev) => [...prev, { role: "model", text: response }]);
    }, 600);
  };

  // --- Interaction Handlers ---
  const handleNodeDrag = (id: string, info: any) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          return { ...n, x: n.x + info.delta.x, y: n.y + info.delta.y };
        }
        return n;
      })
    );
  };

  const handleConnectStart = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setIsConnecting(true);
    setConnectionStart(nodeId);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleConnectEnd = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (isConnecting && connectionStart && connectionStart !== nodeId) {
      // Prevent duplicate edges
      const exists = edges.some(
        (edge) => edge.source === connectionStart && edge.target === nodeId
      );
      // Prevent cycles (simple check: prevents self-loop)
      if (!exists && connectionStart !== nodeId) {
        const newEdge: Edge = {
          id: `e-${connectionStart}-${nodeId}-${Date.now()}`,
          source: connectionStart,
          target: nodeId,
        };
        setEdges([...edges, newEdge]);
      }
    }
    setIsConnecting(false);
    setConnectionStart(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isConnecting && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handlePaneMouseUp = () => {
    if (isConnecting) {
      setIsConnecting(false);
      setConnectionStart(null);
    }
  };

  const deleteEdge = (edgeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEdges((prev) => prev.filter((edge) => edge.id !== edgeId));
  };

  // --- Rendering Helpers ---
  const renderPath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    const deltaX = endX - startX;
    const cp1X = startX + Math.max(deltaX * 0.5, 50);
    const cp2X = endX - Math.max(deltaX * 0.5, 50);
    return `M ${startX} ${startY} C ${cp1X} ${startY}, ${cp2X} ${endY}, ${endX} ${endY}`;
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col relative bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
      {/* Top Toolbar */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <Card className="p-1.5 flex gap-2 bg-white/90 backdrop-blur shadow-sm">
          <Button
            size="sm"
            onClick={() => setIsNodeLibraryOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 shadow-md border-transparent"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Node
          </Button>
          <div className="w-px bg-slate-200 my-1" />
          <Button
            size="sm"
            variant="ghost"
            onClick={handleRunWorkflow}
            disabled={isRunning}
          >
            {isRunning ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Play className="h-4 w-4 mr-2 text-green-600" />
            )}
            {isRunning ? "Running..." : "Run Test"}
          </Button>
          <Button size="sm" variant="ghost">
            <Save className="h-4 w-4 mr-2 text-slate-500" /> Save
          </Button>
        </Card>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handlePaneMouseUp}
        className="flex-1 relative overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] cursor-grab active:cursor-grabbing"
      >
        {/* Connection Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          {/* Existing Edges */}
          {edges.map((edge) => {
            const sourceNode = nodes.find((n) => n.id === edge.source);
            const targetNode = nodes.find((n) => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const startX = sourceNode.x + 240;
            const startY = sourceNode.y + 44;
            const endX = targetNode.x;
            const endY = targetNode.y + 44;

            const isEdgeActive =
              sourceNode.status === "success" &&
              targetNode.status === "running";

            return (
              <g
                key={edge.id}
                className="group pointer-events-auto cursor-pointer"
                onClick={(e) => deleteEdge(edge.id, e)}
              >
                <path
                  d={renderPath(startX, startY, endX, endY)}
                  fill="none"
                  stroke={isEdgeActive ? "#6366f1" : "#94a3b8"}
                  strokeWidth={isEdgeActive ? 3 : 2}
                  className="group-hover:stroke-red-400 transition-colors duration-300"
                />
                <path
                  d={renderPath(startX, startY, endX, endY)}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="15"
                />
                {/* Flow Animation Particle */}
                {(sourceNode.status === "running" ||
                  sourceNode.status === "success") && (
                  <circle r="3" fill="#6366f1">
                    <animateMotion
                      dur="1.5s"
                      repeatCount="indefinite"
                      path={renderPath(startX, startY, endX, endY)}
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Temporary Connection Line being dragged */}
          {isConnecting &&
            connectionStart &&
            (() => {
              const sourceNode = nodes.find((n) => n.id === connectionStart);
              if (!sourceNode) return null;
              const startX = sourceNode.x + 240;
              const startY = sourceNode.y + 44;
              return (
                <path
                  d={renderPath(startX, startY, cursorPos.x, cursorPos.y)}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              );
            })()}
        </svg>

        {/* Nodes Layer */}
        {nodes.map((node) => {
          const Icon = getNodeIcon(node.type);
          const colorClass = getNodeColor(node.type);
          const isSelected = selectedNode?.id === node.id;

          return (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              onDrag={(e, info) => handleNodeDrag(node.id, info)}
              initial={{ x: node.x, y: node.y }}
              whileDrag={{ scale: 1.02, zIndex: 50, cursor: "grabbing" }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNode(node);
              }}
              className="absolute z-10"
              style={{ x: node.x, y: node.y }}
            >
              <div
                className={`w-60 bg-white rounded-xl shadow-lg border-2 transition-all duration-200 group relative
                  ${
                    isSelected
                      ? "border-indigo-500 ring-4 ring-indigo-500/10"
                      : "border-slate-100 hover:border-indigo-200"
                  }
                  ${
                    node.status === "running"
                      ? "ring-2 ring-indigo-500/40 border-indigo-500"
                      : ""
                  }
                  `}
              >
                {/* Header */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex gap-2">
                      {node.status === "running" && (
                        <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                      )}
                      {node.status === "success" && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {node.status === "error" && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNode(node.id);
                        }}
                        className="text-slate-300 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-900 select-none">
                    {node.data.label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1 select-none">
                    {nodeLibrary.find((n) => n.type === node.type)?.description}
                  </p>
                </div>

                {/* Input Handle (Target) */}
                <div
                  onMouseUp={(e) => handleConnectEnd(e, node.id)}
                  className={`absolute -left-3 top-10 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 border-slate-300 z-20 transition-colors
                    ${
                      isConnecting && connectionStart !== node.id
                        ? "hover:border-indigo-500 hover:scale-125 cursor-crosshair shadow-lg"
                        : ""
                    }
                    `}
                >
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                </div>

                {/* Output Handle (Source) */}
                <div
                  onMouseDown={(e) => handleConnectStart(e, node.id)}
                  className="absolute -right-3 top-10 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 border-slate-300 z-20 cursor-crosshair hover:border-indigo-500 hover:scale-110 transition-transform"
                >
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Chat Assistant */}
      <div className="absolute bottom-6 right-6 z-30">
        <AnimatePresence>
          {!isChatOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setIsChatOpen(true)}
              className="h-14 w-14 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-slate-800 hover:scale-105 transition-all"
            >
              <Bot className="h-7 w-7" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Assistant Drawer */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-6 right-6 w-96 h-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-30 overflow-hidden"
          >
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-slate-900 text-white rounded-br-none"
                        : "bg-white border border-slate-200 rounded-bl-none shadow-sm"
                    }`}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: msg.text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={handleChatSubmit}
              className="p-3 bg-white border-t border-slate-100 flex gap-2"
            >
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a command..."
                className="flex-1"
              />
              <Button
                size="icon"
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Node Library Modal */}
      <Modal
        isOpen={isNodeLibraryOpen}
        onClose={() => setIsNodeLibraryOpen(false)}
        title="Add Node"
        className="max-w-2xl"
      >
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search nodes (e.g. Gmail, Webhook)..."
            className="pl-9"
            value={searchNodeTerm}
            onChange={(e) => setSearchNodeTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto p-1">
          {nodeLibrary
            .filter((n) =>
              n.label.toLowerCase().includes(searchNodeTerm.toLowerCase())
            )
            .map((node) => (
              <button
                key={node.type}
                onClick={() => handleAddNode(node.type as NodeType)}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-center group h-32"
              >
                <div
                  className={`p-3 rounded-full mb-3 ${getNodeColor(
                    node.type
                  )} group-hover:bg-white`}
                >
                  <node.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-slate-900">
                  {node.label}
                </span>
                <span className="text-[10px] text-slate-500 mt-1">
                  {node.category}
                </span>
              </button>
            ))}
        </div>
      </Modal>

      {/* Node Configuration Drawer */}
      <Drawer
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        title="Configure Node"
        side="right"
      >
        {selectedNode && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div
                className={`p-2 rounded-lg ${getNodeColor(selectedNode.type)}`}
              >
                {React.createElement(getNodeIcon(selectedNode.type), {
                  size: 24,
                })}
              </div>
              <div>
                <h3 className="font-bold text-lg">{selectedNode.data.label}</h3>
                <Badge
                  variant="outline"
                  className="mt-1 uppercase text-[10px] tracking-wider"
                >
                  {selectedNode.type}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Node Name</label>
                <Input
                  value={selectedNode.data.label}
                  onChange={(e) =>
                    updateNodeData(selectedNode.id, { label: e.target.value })
                  }
                />
              </div>

              {/* Dynamic Inputs based on type */}
              {selectedNode.type === "llm" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">System Prompt</label>
                    <Textarea
                      placeholder="You are a helpful assistant..."
                      className="h-32"
                      defaultValue={selectedNode.data.config?.prompt || ""}
                      onChange={(e) =>
                        updateNodeData(selectedNode.id, {
                          config: {
                            ...selectedNode.data.config,
                            prompt: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Model</label>
                    <select className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">
                      <option>Gemini 2.5 Flash</option>
                      <option>Gemini 3 Pro</option>
                    </select>
                  </div>
                </>
              )}

              {selectedNode.type === "http" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Method</label>
                    <div className="flex gap-2">
                      {["GET", "POST", "PUT", "DELETE"].map((m) => (
                        <button
                          key={m}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium hover:bg-slate-100 focus:bg-slate-900 focus:text-white"
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">URL</label>
                    <Input placeholder="https://api.example.com/v1/resource" />
                  </div>
                </>
              )}

              <div className="pt-6 border-t border-slate-100 flex gap-2">
                <Button
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => setSelectedNode(null)}
                >
                  Save Configuration
                </Button>
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => deleteNode(selectedNode.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default WorkflowBuilder;
