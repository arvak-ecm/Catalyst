export interface JwtResponse {
  header: Record<string, string>
  payload: Record<string, string>
  error: string
}
