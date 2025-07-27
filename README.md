# 🚀 Node.js K8s DevOps Project

This project demonstrates a complete DevOps pipeline for a Node.js + Express app using:

- **Docker & GitHub Actions** for CI/CD
- **Kubernetes (Minikube)** for orchestration
- **Helm** for deployment
- **Prometheus + Grafana** for monitoring
- **Trivy** for container security scanning

---

## 🏗️ Project Structure

```

node-k8s-devops/
├── Dockerfile
├── deployment.yaml
├── .github/
│   └── workflows/
│       └── docker-build.yml
├── helm/
│   └── node-api/
│       └── templates/
│           └── deployment.yaml
├── monitoring/
│   └── node-api-servicemonitor.yaml
├── package.json
└── index.js

````

---

## ✅ Features

- Automatically builds & scans Docker image on push to `main`
- Pushes Docker image to DockerHub
- Deploys Node.js app to Kubernetes using Helm
- Monitors app with Prometheus & Grafana
- Secures container with Trivy scan

---

## 🔄 CI/CD Flow

1. Push to `main` on GitHub
2. GitHub Actions:
   - Builds Docker image
   - Scans with Trivy
   - Pushes to DockerHub
3. Manually deploy using Helm:
   ```bash
   helm install node-api ./helm/node-api
````

---

## 📊 Monitoring

* **Prometheus** scrapes metrics from the app
* **Grafana** displays metrics dashboards
* ServiceMonitor configured via `monitoring/node-api-servicemonitor.yaml`
* Prometheus data source in Grafana:

  ```
  http://prometheus-stack-kube-prom-prometheus.default.svc.cluster.local:9090
  ```

---

## 🔒 Security with Trivy

Trivy scans the Docker image for vulnerabilities **before push**:

```yaml
- name: Run Trivy Scan
  uses: aquasecurity/trivy-action@v0.20.0
  with:
    image-ref: 'shruti29044/node-k8s-api:latest'
    format: 'table'
    exit-code: '1'
    ignore-unfixed: true
```

---

## 🛠️ GitHub Actions Workflow

`.github/workflows/docker-build.yml`:

```yaml
name: Build and Push Docker Image with Trivy Scan

on:
  push:
    branches:
      - main

jobs:
  build-and-scan:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3

    - name: Log in to DockerHub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build Docker image
      run: docker build -t shruti29044/node-k8s-api:latest .

    - name: Run Trivy Scan
      uses: aquasecurity/trivy-action@v0.20.0
      with:
        image-ref: 'shruti29044/node-k8s-api:latest'
        format: 'table'
        exit-code: '1'
        ignore-unfixed: true

    - name: Push Docker image
      run: docker push shruti29044/node-k8s-api:latest
```

---

## 🚧 Detailed Challenges Faced & Resolutions

| Area                                       | Challenge                                                                                  | Resolution                                                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| **GitHub Actions – Secret Leaks**          | GitHub flagged a hardcoded DockerHub access token as a security risk and blocked the push. | Used GitHub Secrets instead of hardcoding the credentials and recommitted securely.                    |
| **Trivy Version Error**                    | GitHub Actions couldn't resolve `aquasecurity/trivy-action@v0.13.0`.                       | Updated to the correct latest version: `@v0.20.0`.                                                     |
| **Prometheus-Grafana Connection**          | Grafana couldn’t reach Prometheus via `localhost:9090` inside Kubernetes.                  | Used internal DNS: `http://prometheus-stack-kube-prom-prometheus.default.svc.cluster.local:9090`.      |
| **Port Conflicts**                         | Error: `Unable to listen on port 9090`.                                                    | Used alternate local port: `kubectl port-forward svc/prometheus-stack-kube-prom-prometheus 9095:9090`. |
| **Docker Build Errors**                    | `npm install` failed due to missing `package.json`.                                        | Ran `npm init -y` and installed dependencies (`express`, `mongoose`).                                  |
| **Git Remote Issues**                      | `git remote origin already exists` or `repository not found`.                              | Reset remote URL using `git remote set-url`.                                                           |
| **DockerHub Login Confusion**              | Didn’t know how to use Docker access token in CLI.                                         | Logged in using `docker login -u USERNAME`, then pasted the access token as password.                  |
| **Grafana Dashboards Not Showing Metrics** | No metrics shown despite Prometheus running.                                               | Created and applied `ServiceMonitor`, and ensured metrics were exposed in the app.                     |

---

## 🎯 Final Thoughts

This project gives you full hands-on with:

* Containerization
* Infrastructure as Code
* CI/CD pipelines
* Monitoring & observability
* Secure builds

You can now expand this with:

* ArgoCD for GitOps
* Terraform for cloud infra
* Snyk or other advanced security tools

---

Let me know if you'd like this saved as a file (`README.md`) or pushed to GitHub automatically.

```
```
