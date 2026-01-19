class AuthService
  def self.login(username, password)
    # 1. Buscar al usuario por username (case insensitive es buena práctica)
    user = User.find_by(username: username)

    # 2. Validar password usando el método seguro de Devise
    if user && user.valid_password?(password)
      # 3. Retornar éxito y datos (simulando un token por ahora)
      return {
        success: true,
        user: { username: user.username, id: user.id },
        resource: user, # Needed for Devise sign_in in controller
        token: "mock-jwt-token-#{SecureRandom.hex(10)}" # En producción usarías JWT real
      }
    else
      # 4. Retornar error genérico de seguridad
      return {
        success: false,
        error: "Credenciales inválidas"
      }
    end
  end
end
