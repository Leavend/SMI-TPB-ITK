Description-Github-SIM TPB

# System Management Information TPB-ITK

## Project Description

This project is aimed at developing a System Management Information (SMI) for TPB-ITK to efficiently manage and track various administrative tasks.

## Code Structure

The project is organized into the following directories and files:

```sh
SMI-TPB-ITK/
├── skaffold.yaml # Skaffold configuration file for Kubernetes
├── auth-service # Authentication service module
│ ├── src # Source code for the auth service
│ │ ├── controllers # Controllers handle HTTP requests
│ │ │ ├── role-controller.ts
│ │ │ └── user-controller.ts
│ │ ├── database # Database connection and initialization
│ │ │ ├── index.ts
│ │ │ └── init.ts
│ │ ├── datasources # Data source files for different entities
│ │ │ ├── dosen-datasource.ts
│ │ │ ├── mahasiswa-datasource.ts
│ │ │ ├── role-datasource.ts
│ │ │ ├── tendik-datasource.ts
│ │ │ ├── token-datasource.ts
│ │ │ ├── user-datasource.ts
│ │ │ └── user-role-datasource.ts
│ │ ├── interfaces # Interfaces for type definitions
│ │ │ ├── enum
│ │ │ │ ├── code-enum.ts
│ │ │ │ └── user-enum.ts
│ │ │ ├── dosen-interface.ts
│ │ │ ├── mahasiswa-interface.ts
│ │ │ ├── role-interface.ts
│ │ │ ├── tendik-interface.ts
│ │ │ ├── token-interface.ts
│ │ │ ├── user-interface.ts
│ │ │ └── user-role-interface.ts
│ │ ├── middlewares # Middlewares for request processing
│ │ │ └── index.middleware.ts
│ │ ├── models # Database models
│ │ │ ├── dosen-model.ts
│ │ │ ├── mahasiswa-model.ts
│ │ │ ├── role-model.ts
│ │ │ ├── tendik-model.ts
│ │ │ ├── token-model.ts
│ │ │ ├── user-model.ts
│ │ │ └── user-role-model.ts
│ │ ├── permissions # Permissions management
│ │ │ └── index.ts
│ │ ├── routers # Routers for endpoint definitions
│ │ │ ├── role-router.ts
│ │ │ └── user-router.ts
│ │ ├── services # Service layer for business logic
│ │ │ ├── consume-message-service.ts
│ │ │ ├── dosen-service.ts
│ │ │ ├── email-service.ts
│ │ │ ├── mahasiswa-service.ts
│ │ │ ├── message-service.ts
│ │ │ ├── role-service.ts
│ │ │ ├── tendik-service.ts
│ │ │ ├── token-service.ts
│ │ │ ├── user-role-service.ts
│ │ │ └── user-service.ts
│ │ ├── templates # Email templates
│ │ │ └── email.html
│ │ ├── utils # Utility functions
│ │ │ └── index.utils.ts
│ │ └── validators # Schema validators
│ │ └── user-validator-schema.ts
│ ├── .dockerignore # Files and directories to ignore in Docker
│ ├── .gitignore # Files and directories to ignore in Git
│ ├── .prettier # Prettier configuration file
│ ├── Dockerfile # Docker configuration file
│ ├── index.ts # Entry point for the auth service
│ ├── package-lock.json # Lockfile for npm
│ ├── package.json # npm package configuration file
│ └── tsconfig.json # TypeScript configuration file
├── infra-service # Infrastructure service configuration
│ ├── k8s # Kubernetes configuration files
│ │ ├── config_secret # ConfigMaps and Secrets for Kubernetes
│ │ │ ├── configmap-depl.yaml
│ │ │ ├── configmap-rabbit.yaml
│ │ │ ├── secretkey-depl.yaml
│ │ │ └── secretkey-rabbit.yaml
│ │ ├── db # Database deployment files
│ │ │ ├── mysql-depl.yaml
│ │ │ ├── mysql-srv.yaml
│ │ │ ├── pv-depl.yaml
│ │ │ └── pvc-depl.yaml
│ │ ├── rabbitmq # RabbitMQ deployment files
│ │ │ ├── pv-depl.yaml
│ │ │ ├── pvc-depl.yaml
│ │ │ ├── rabbit-srv.yaml
│ │ │ └── rabbit-stateful.yaml
│ │ ├── auth-service-depl.yaml # Auth service deployment
│ │ ├── auth-service-srv.yaml # Auth service service definition
│ │ └── ingress-srv.yaml # Ingress service configuration
```

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/SMI-TPB-ITK.git
    cd SMI-TPB-ITK
    ```

## Usage

1. Run the main application (Make sure you're done with skaffold set up):
    ```sh
    skaffold dev
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) (Not Yet Licensed) file for details.
