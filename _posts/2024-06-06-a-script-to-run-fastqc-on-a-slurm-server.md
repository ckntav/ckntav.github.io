---
title: "a script to run fastqc on a slurm server"
classes: wide
tags:
  - bash
  - slurm
  - fastqc
  - bioinfo
  - ngs (next-generation sequencing)
  - compute cluster
---

Hello Dr Moss,

In this guide, we’ll walk through the steps required to run FastQC, a quality control tool for high throughput sequence data, on a SLURM-managed high-performance computing (HPC) system. `SLURM` (Simple Linux Utility for Resource Management) is a powerful tool for scheduling and managing jobs on a compute cluster.

### Step 1 : prepare your data

Before running FastQC, ensure that your sequencing data files (typically in FASTQ format) are accessible from the compute nodes. You might have these files stored in a directory such as `raw/chipseq_NIH3T3/raw_fastq/PolI_5min_R1.fastq.gz`

### Step 2 : create a SLURM job script
Open a blank document and name it  `run_fastqc.sh` 

```bash
#!/bin/sh
#SBATCH --time=3:00:00
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=4
#SBATCH --mem-per-cpu=8G
#SBATCH --account=<your_account>
#SBATCH --mail-user=<your_email>
#SBATCH --mail-type=ALL

# Define input file and output directory
INPUT_FILE="/path/to/your/fastq/file"
OUTPUT_DIR="/path/to/your/output/directory"

# Create output directory if it doesn't exist
mkdir -p $OUTPUT_DIR

# Run FastQC on the specified FASTQ file
fastqc --outdir $OUTPUT_DIR --format fastq $INPUT_FILE
```

Comments:
- `#!/bin/sh` : this specifies the shell to use for the script
- `#SBATCH --time=3:00:00` : specifies the maximum run time for the job. Here, it is set to 3 hours.
- `#SBATCH --nodes=1`: requests one node for the job.
- `#SBATCH --ntasks-per-node=1` : requests one task per node. Since only one task is needed, this is set to 1.
- `#SBATCH --cpus-per-task=4` : allocates 4 CPUs per task. This helps if the job can use multi-threading to speed up processing.
- `#SBATCH --mem-per-cpu=8G` : allocates 8GB of memory per CPU. With 4 CPUs, the total memory for the job will be 32GB.
- `#SBATCH --account=<your_account>` : specifies the account to charge for the job. Replace `<your_account>` with your actual account name.
- `#SBATCH --mail-user=<your_email>` : sets the email address to receive job status notifications. Replace `<your_email>` with your actual email address.
- `#SBATCH --mail-type=ALL` : sends email notifications for all events related to the job (start, end, fail, etc.).

Save this file as `run_fastqc.sh` and transfer it on the compute cluster.

### Step 3 : load FastQC module
HPC systems use environment modules to manage different software packages. Check if FastQC is available on your system and load it:

``` bash
module load fastqc
```

### Step 4 : submit the job to the SLURM Scheduler
Submit your job script to the SLURM scheduler using the following command:
``` bash
sbatch path/to/run_fastqc.sh
```
After submitting the job, SLURM will return a job ID. You can use this `<job_id>` to monitor the status of your job.

### Step 5 : monitor the job
You can check the status of your job using the `squeue` command, which lists all your jobs currently managed by SLURM:
``` bash
squeue -u your_username
```

In this case, only one job should appear. The output will show details such as the job ID, job name, partition, and job state. Here are some common job states you might see:
- PD (Pending): The job is waiting to be scheduled.
- (Running): The job is currently running.
- (Completing): The job is finishing its processes.
- (Completed): The job has finished successfully.
- (Failed): The job has failed.

To get more detailed information about a specific job, use the `scontrol` command:
``` bash
scontrol show job <job_id>
```
This command provides comprehensive details about the job, including the reason for any delays if the job is pending.

### Step 6 : check the output
Once the job completes, you should have receive an email with the mention `COMPLETED`. `FastQC` output files will be located in the directory you specified. Each FASTQ file processed will generate a `.html` report and a `.zip` archive containing detailed quality control metrics.
Transfer it on your local compute to open and explore those files.

By following these steps, you should be able to run FastQC on a `SLURM` system efficiently. Adjust the `SLURM` script parameters (e.g., memory, time limit) according to the specifics of your HPC environment and the size of your data.

The advantage of using `SLURM` as a resource management system is its ability to efficiently distribute computational resources, manage job queues, and optimize power usage, making it an ideal solution for high-performance computing tasks.