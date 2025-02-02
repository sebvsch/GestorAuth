FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copia los archivos de proyecto primero para aprovechar el cache de capas
COPY *.sln .
COPY Be_GestorAuth/*.csproj ./Be_GestorAuth/

# Restaura las dependencias
RUN dotnet restore

# Copia todo el código fuente
COPY . .

# Publica la aplicación
RUN dotnet publish -c Release -o out

# Build de la imagen final
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "Be_GestorAuth.dll"]