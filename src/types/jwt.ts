export interface JwtResponse {
  header: Record<string, string>
  payload: Record<string, string>
  decodeBase: boolean
  decodeSecurity: boolean
  error: string
}
