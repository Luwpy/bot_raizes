{
  description = "Flake for raizes bot project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs =
    inputs@{ flake-parts, nixpkgs, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ]; # Defina os sistemas que você usa

      perSystem =
        {
          config,
          pkgs,
          system,
          ...
        }:
        {
          devShells.default = pkgs.mkShell {
            packages = with pkgs; [
              prisma-engines
              bun
              nodejs_22
              openssl
              postgresql
            ];

            PRISMA_CLI_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
            PRISMA_CLI_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
            PRISMA_CLI_MIGRATION_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/migration-engine";
            PRISMA_CLI_INTROSPECTION_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/introspection-engine";

            shellHook = ''
              echo "✅ DevShell para Raízes Bot iniciada!"
            '';
          };
        };
    };
}
