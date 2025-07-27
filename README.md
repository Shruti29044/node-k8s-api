# 🌐 Node.js K8s DevOps Project

This project demonstrates a complete DevOps pipeline for a **Node.js + Express + MongoDB** app with Docker, Kubernetes, CI/CD, Monitoring, and Security Scanning.

---

## 🛠️ Stack Overview

| Layer        | Tool/Tech                               |
|--------------|------------------------------------------|
| App          | Node.js + Express + MongoDB              |
| Container    | Docker                                   |
| Orchestration| Kubernetes (Minikube)                    |
| CI/CD        | GitHub Actions                           |
| IaC          | Helm                                     |
| Monitoring   | Prometheus + Grafana                     |
| Security     | Trivy (Docker Image Scanning)            |

---

## 🚀 Features

- RESTful Node.js API with Express
- Containerized using Docker
- CI/CD via GitHub Actions
- Docker image scanning with Trivy
- Kubernetes deployment using Helm
- Monitoring using Prometheus and Grafana
- Works with Minikube or any K8s cluster

---

## 📁 Project Structure

```

.
├── .github/workflows         # GitHub Actions CI workflow
├── Dockerfile                # Docker build instructions
├── helm/                     # Helm chart for deployment
├── k8s/                      # Kubernetes YAMLs (if not using Helm)
├── monitoring/               # ServiceMonitor for Prometheus
├── src/                      # Node.js app source code
└── README.md

````

---

## 🐳 Docker Commands

```bash
# Build and tag image
docker build -t shruti29044/node-k8s-api:latest .

# Push to DockerHub
docker login -u shruti29044
docker push shruti29044/node-k8s-api:latest
````

---

## 🤖 GitHub Actions CI/CD

On every push to `main`, this runs:

* Checkout code
* Build Docker image
* Run **Trivy** vulnerability scan
* Push image to DockerHub

> GitHub Secrets used:

* `DOCKER_USERNAME`
* `DOCKER_PASSWORD`

Workflow file:

```
.github/workflows/docker-build.yml
```

---

## ☸️ Kubernetes (Minikube)

```bash
# Start minikube
minikube start

# Deploy to K8s
kubectl apply -f k8s/deployment.yaml

# Forward port
kubectl port-forward svc/node-api-api 3000:3000
```

---

## 📦 Helm Deployment (Optional)

```bash
# Install Helm dependencies (if any)
helm dependency update helm/

# Deploy with Helm
helm install node-api helm/

# Upgrade
helm upgrade node-api helm/
```

---

## 📊 Monitoring with Prometheus + Grafana

### Access Grafana

```bash
kubectl port-forward svc/prometheus-stack-grafana 3000:80
# Then go to http://localhost:3000
```

* Username: `admin`
* Password: `prom-operator`

### Prometheus Data Source URL

```
http://prometheus-stack-kube-prom-prometheus.default.svc.cluster.local:9090
```

---

## 🔐 Security: Trivy Docker Image Scan

Run manually (or in CI):

```bash
trivy image shruti29044/node-k8s-api:latest
```

---

## ⚠️ Challenges Faced

| Area           | Challenge                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| GitHub Actions | Git push was blocked due to hardcoded secrets; resolved via GitHub Secrets                           |
| Trivy          | Trivy version mismatch; had to use a valid supported version                                         |
| Prometheus     | Grafana couldn't reach Prometheus at `localhost`; fixed by using the internal Kubernetes service URL |
| Kubernetes     | Port-forwarding conflicts; solved by forwarding to alternate local ports                             |
| Docker         | Dockerfile failed initially due to missing `package.json`                                            |
| Grafana        | Custom dashboards didn't load due to missing metrics; fixed after Prometheus connection              |
| CI/CD          | Debugging CI failure logs and tweaking `docker-build.yml`                                            |

---

## 📄 License

MIT License © 2025 Shruti29044

---

## 🙌 Acknowledgements

* [Trivy](https://github.com/aquasecurity/trivy)
* [Prometheus](https://prometheus.io/)
* [Grafana](https://grafana.com/)
* [Kubernetes](https://kubernetes.io/)
* [GitHub Actions](https://docs.github.com/actions)

```

---

Let me know if you'd like this saved as a file using a command, or if you want to publish it to your GitHub repo directly.
```
