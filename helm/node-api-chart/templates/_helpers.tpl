{{/*
Return the full name of the release
*/}}
{{- define "node-api.fullname" -}}
{{- printf "%s-%s" .Release.Name "api" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Return the name of the chart
*/}}
{{- define "node-api.name" -}}
{{- printf "%s" .Chart.Name -}}
{{- end -}}
