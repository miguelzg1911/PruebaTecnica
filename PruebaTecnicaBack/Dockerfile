# Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["Electra.Api/Electra.Api.csproj", "Electra.Api/"]
COPY ["Electra.Application/Electra.Application.csproj", "Electra.Application/"]
COPY ["Electra.Domain/Electra.Domain.csproj", "Electra.Domain/"]
COPY ["Electra.Infrastructure/Electra.Infrastructure.csproj", "Electra.Infrastructure/"]
RUN dotnet restore "Electra.Api/Electra.Api.csproj"

COPY . .
WORKDIR "/src/Electra.Api"
RUN dotnet build "Electra.Api.csproj" -c Release -o /app/build

# Publicar
FROM build AS publish
RUN dotnet publish "Electra.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Imagen final (Runtime)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

COPY Electra.Api/electra.db . 

ENTRYPOINT ["dotnet", "Electra.Api.dll"]