import { email, string, z } from 'zod'

export const schemaAutch = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string()
    .min(8, 'Digite uma senha com pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Digite pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Digite ao menos uma letra minúscula')
    .regex(/[0-9]/, 'Digite ao menos um número')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Precisa de 1 caractere especial'),
    confSenha: z.string().refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
    })})
export const schemaLogin = z.object({
  email: z.
  string()
  .email(),
  senha: z.
  string()
})