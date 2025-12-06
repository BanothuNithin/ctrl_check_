import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Play,
  MousePointer2,
  Settings2,
  Trash2,
  X,
  Search,
  MessageSquare,
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
  Phone,
  Brain,
  Repeat,
  Wrench,
  Code,
  BarChart3,
} from "lucide-react";
import {
  Button,
  Card,
  Input,
  Badge,
  Drawer,
  Textarea,
  Avatar,
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
  | "postgres"
  | "whatsapp"
  | "memory"
  | "loop"
  | "formatter"
  | "custom_api"
  | "excel";
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
    type: "whatsapp",
    label: "WhatsApp",
    icon: Phone,
    category: "Integration",
    description: "Send WhatsApp messages",
  },
  {
    type: "sheets",
    label: "Google Sheets",
    icon: FileSpreadsheet,
    category: "Data",
    description: "Read/Write to spreadsheet",
  },
  {
    type: "excel",
    label: "Excel",
    icon: BarChart3,
    category: "Data",
    description: "Work with Excel files",
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
    icon: GitBranchIcon,
    category: "Logic",
    description: "Branching logic",
  },
  {
    type: "loop",
    label: "Loop",
    icon: Repeat,
    category: "Logic",
    description: "Iterate over items",
  },
  {
    type: "memory",
    label: "Memory",
    icon: Brain,
    category: "Context",
    description: "Store and retrieve context",
  },
  {
    type: "formatter",
    label: "Formatter",
    icon: Wrench,
    category: "Transform",
    description: "Format and transform data",
  },
  {
    type: "custom_api",
    label: "Custom API",
    icon: Code,
    category: "Integration",
    description: "Call custom API endpoints",
  },
];

function GitBranchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" y1="3" x2="6" y2="15"></line>
      <circle cx="18" cy="6" r="3"></circle>
      <circle cx="6" cy="18" r="3"></circle>
      <path d="M18 9a9 9 0 0 1-9 9"></path>
    </svg>
  );
}

const WorkflowBuilder = () => {
  // State
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "1",
      type: "webhook",
      x: 100,
      y: 150,
      data: { label: "Start Trigger" },
      status: "success",
    },
    {
      id: "2",
      type: "llm",
      x: 450,
      y: 200,
      data: { label: "Analyze Input" },
      status: "idle",
    },
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
      text: 'Hi! I can help you build this workflow. Try asking: "How do I connect Gmail?" or "Add a sentiment analysis node".',
    },
  ]);

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

  const handleAddNode = (type: NodeType) => {
    const newNode: Node = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      data: {
        label: nodeLibrary.find((n) => n.type === type)?.label || "New Node",
      },
      status: "idle",
    };
    setNodes([...nodes, newNode]);
    setIsNodeLibraryOpen(false);
  };

  const handleRunWorkflow = () => {
    // Simulate execution
    const updatedNodes = nodes.map((n) => ({
      ...n,
      status: "running" as NodeStatus,
    }));
    setNodes(updatedNodes);

    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) => ({ ...n, status: "success" as NodeStatus }))
      );
    }, 2000);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: "user", text: chatInput }]);
    setChatInput("");
    // Simulate response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I've analyzed your request. It looks like you want to add a filter. I recommend using the 'If/Else' node.",
        },
      ]);
    }, 1000);
  };

  // --- SVG Connections ---
  const renderConnections = () => {
    // Simple sequential connection for demo purposes
    // In a real app, you'd have an 'edges' state
    if (nodes.length < 2) return null;

    return nodes.map((node, index) => {
      if (index === nodes.length - 1) return null;
      const nextNode = nodes[index + 1];

      const startX = node.x + 240; // width
      const startY = node.y + 45; // half height roughly
      const endX = nextNode.x;
      const endY = nextNode.y + 45;

      const cp1X = startX + (endX - startX) / 2;
      const cp2X = startX + (endX - startX) / 2;

      return (
        <g key={`conn-${node.id}-${nextNode.id}`}>
          <path
            d={`M ${startX} ${startY} C ${cp1X} ${startY}, ${cp2X} ${endY}, ${endX} ${endY}`}
            fill="none"
            stroke={node.status === "success" ? "#22c55e" : "#cbd5e1"}
            strokeWidth="3"
            className="transition-colors duration-500"
          />
          {node.status === "running" && (
            <circle r="4" fill="#22c55e">
              <animateMotion
                dur="1s"
                repeatCount="indefinite"
                path={`M ${startX} ${startY} C ${cp1X} ${startY}, ${cp2X} ${endY}, ${endX} ${endY}`}
              />
            </circle>
          )}
        </g>
      );
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col relative bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
      {/* Top Toolbar */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Card className="p-1.5 flex gap-2 bg-white/90 backdrop-blur shadow-sm">
          <Button
            size="sm"
            onClick={() => setIsNodeLibraryOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 shadow-md border-transparent"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Node
          </Button>
          <div className="w-px bg-slate-200 my-1" />
          <Button size="sm" variant="ghost" onClick={handleRunWorkflow}>
            <Play className="h-4 w-4 mr-2 text-green-600" /> Run Test
          </Button>
          <Button size="sm" variant="ghost">
            <Save className="h-4 w-4 mr-2 text-slate-500" /> Save
          </Button>
        </Card>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {renderConnections()}
        </svg>

        {nodes.map((node) => {
          const Icon = getNodeIcon(node.type);
          const colorClass = getNodeColor(node.type);

          return (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              initial={{ x: node.x, y: node.y, opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileDrag={{ scale: 1.05, zIndex: 20 }}
              onDragEnd={(e, info) => {
                const newNodes = [...nodes];
                const idx = newNodes.findIndex((n) => n.id === node.id);
                newNodes[idx].x += info.offset.x;
                newNodes[idx].y += info.offset.y;
                // Ideally update state here, but for simple drag motion.div handles visual
              }}
              onClick={() => setSelectedNode(node)}
              className="absolute z-10 cursor-grab active:cursor-grabbing"
              style={{ left: 0, top: 0, x: node.x, y: node.y }} // using x/y from motion but initializing position
            >
              <div
                className={`w-60 bg-white rounded-xl shadow-lg border-2 transition-all duration-200 group ${
                  selectedNode?.id === node.id
                    ? "border-indigo-500 ring-4 ring-indigo-500/10"
                    : "border-slate-100 hover:border-indigo-200"
                }`}
              >
                <div className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {node.status === "running" && (
                      <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                    )}
                    {node.status === "success" && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {node.status === "error" && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900">
                    {node.data.label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {nodeLibrary.find((n) => n.type === node.type)?.description}
                  </p>
                </div>
                {/* Node Ports */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-slate-300 hover:border-indigo-500 transition-colors" />
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-slate-300 hover:border-indigo-500 transition-colors" />
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
            className="absolute bottom-6 right-6 w-96 h-[350px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-30 overflow-hidden"
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
                    {msg.text}
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
                placeholder="Ask for help..."
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

      {/* Node Library Modal - Centered Full Screen */}
      <AnimatePresence>
        {isNodeLibraryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsNodeLibraryOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Add Node
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Select a node type to add to your workflow
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsNodeLibraryOpen(false)}
                  className="text-slate-500 hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-slate-200 bg-white">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search nodes (Gmail, Webhook, LLM, Memory, Loop...)..."
                    className="pl-9 py-3 text-base"
                    value={searchNodeTerm}
                    onChange={(e) => setSearchNodeTerm(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              {/* Nodes Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {nodeLibrary
                    .filter(
                      (n) =>
                        n.label
                          .toLowerCase()
                          .includes(searchNodeTerm.toLowerCase()) ||
                        n.description
                          .toLowerCase()
                          .includes(searchNodeTerm.toLowerCase())
                    )
                    .map((node) => (
                      <motion.button
                        key={node.type}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddNode(node.type as NodeType)}
                        className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <div
                          className={`p-4 rounded-xl mb-3 transition-all ${getNodeColor(
                            node.type
                          )} group-hover:scale-110`}
                        >
                          <node.icon className="h-6 w-6" />
                        </div>
                        <span className="text-sm font-semibold text-slate-900 text-center">
                          {node.label}
                        </span>
                        <span className="text-[11px] text-slate-500 mt-1.5 font-medium">
                          {node.category}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-2 text-center line-clamp-2">
                          {node.description}
                        </span>
                      </motion.button>
                    ))}
                </div>
                {nodeLibrary.filter(
                  (n) =>
                    n.label
                      .toLowerCase()
                      .includes(searchNodeTerm.toLowerCase()) ||
                    n.description
                      .toLowerCase()
                      .includes(searchNodeTerm.toLowerCase())
                ).length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Search className="h-12 w-12 text-slate-300 mb-3" />
                    <p className="text-slate-500 font-medium">No nodes found</p>
                    <p className="text-sm text-slate-400">
                      Try searching for something else
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <Input defaultValue={selectedNode.data.label} />
              </div>

              {/* Dynamic Inputs based on type */}
              {selectedNode.type === "llm" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">System Prompt</label>
                    <Textarea
                      placeholder="You are a helpful assistant..."
                      className="h-32"
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
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                  Save Configuration
                </Button>
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
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
