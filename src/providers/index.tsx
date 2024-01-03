import { ModalProvider } from "./modal-provider";

export default function Providers({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  )
}
