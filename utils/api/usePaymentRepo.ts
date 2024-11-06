export const usePaymentRepo = () => ({
  async post(body: { id?: string; price: string }): Promise<{
    confirmationUrl: string
  }> {
    return $fetch(`/api/payment`, {
      method: 'POST',
      body: { order: body }
    })
  }
})
