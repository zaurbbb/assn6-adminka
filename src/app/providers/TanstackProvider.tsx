import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactNode } from "react";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  persister,
  queryClient,
} from "../../tanstack/index";

interface TanStackProviderProps {
  children?: ReactNode;
}

// interface TanStackDevtoolsProps {
//   open?: boolean;
// }

// function TanStackProviderDevtools({
//   open = false,
// }: TanStackDevtoolsProps): ReactNode {
//   if (!open) return null;
//   return (
//     <div style={{ fontSize: "16px" }}>
//       <ReactQueryDevtools initialIsOpen={true} />
//     </div>
//   );
// }

function TanStackProvider({ children }: TanStackProviderProps): ReactNode {
  // const [isDevtoolsOpen, setDevtoolsOpen] = useState(false);

  // useEffect(() => {
  //   const handleKeyPress = (event: KeyboardEvent) => {
  //     if (event.key === "\\") {
  //       setDevtoolsOpen((prev) => !prev);
  //     }
  //   };
  //
  //   window.addEventListener("keypress", handleKeyPress);
  //
  //   return () => {
  //     window.removeEventListener("keypress", handleKeyPress);
  //   };
  // }, []);

  return (
    <PersistQueryClientProvider
      persistOptions={{ persister }}
      client={queryClient}
      onSuccess={() => {
        void queryClient.resumePausedMutations().then(() => {
          void queryClient.invalidateQueries();
        });
      }}
    >
      {children}
      {/*<TanStackProviderDevtools open={isDevtoolsOpen} />*/}
    </PersistQueryClientProvider>
  );
}

export default TanStackProvider;
