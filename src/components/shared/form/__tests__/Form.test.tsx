import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Form } from "../form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";

vi.mock("@/services/api", () => ({
  sendFormData: vi.fn().mockResolvedValue({ success: true }),
}));

const renderWithClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Form component", () => {
  it("отображает поля формы и отправляет данные", async () => {
    renderWithClient(<Form />);

    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBeGreaterThanOrEqual(5);

    fireEvent.change(inputs[0], { target: { value: "Elvira" } });
    fireEvent.change(inputs[1], { target: { value: "elvira@example.com" } });
    fireEvent.change(inputs[2], { target: { value: "30" } });
    fireEvent.change(inputs[3], { target: { value: "Developer" } });
    fireEvent.change(inputs[4], { target: { value: "CompanyX" } });

    const button = screen.getByRole("button", { name: /send/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /send/i })).not.toBeDisabled();
    });

    const { sendFormData } = await import("@/services/api");
    expect(sendFormData).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Elvira",
        email: "elvira@example.com",
      })
    );
  });

  it("показывает ошибки при пустых полях", async () => {
    renderWithClient(<Form />);

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "" } });

    fireEvent.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() => {
      const errors = screen.getAllByText(/The field is required/i);
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
