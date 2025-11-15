import { motion, AnimatePresence } from "framer-motion";
import { IntroOrb } from "./IntroOrb";
import { useVapiAssistant } from "@/hooks/useVapiAssistant";
import { useVapiCommands } from "@/hooks/useVapiCommands";
import { useClientSideFunctions } from "@/hooks/useClientSideFunctions";
import { useMemo } from "react";
import * as domActions from "@/utils/domActions";

export const FloatingAssistant = () => {
  const { startAssistant, stopAssistant, isActive, isSpeaking } = useVapiAssistant();

  // DOM Actions mapping for VAPI commands
  const actionHandlers = useMemo(() => ({
    scroll_page: domActions.scroll_page,
    click_element: domActions.click_element,
    fill_field: domActions.fill_field,
    toggle_element: domActions.toggle_element,
    navigate_to_page: domActions.navigate_to_page,
    // get_page_context handled by useClientSideFunctions
  }), []);

  // Listen for commands from VAPI webhook via Realtime
  useVapiCommands(actionHandlers);
  
  // Handle client-side function execution (get_page_context)
  useClientSideFunctions();

  const handleClick = () => {
    if (isActive) {
      stopAssistant();
    } else {
      startAssistant();
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      aria-label={isActive ? "Stop voice assistant" : "Start voice assistant"}
    >
      <div className="relative">
        <IntroOrb size="small" />
        
        {/* Active indicator */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full shadow-lg"
            >
              {isSpeaking && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-green-400 rounded-full opacity-50"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
